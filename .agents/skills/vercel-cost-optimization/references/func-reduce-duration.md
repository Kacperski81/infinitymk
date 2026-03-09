````markdown
---
title: Minimize Active CPU Time Since Billing Pauses During I/O
impact: CRITICAL
impactDescription: Active CPU is the primary compute cost driver — you are only billed during actual code execution, not while waiting for I/O
tags: active-cpu, function, duration, compute, I/O, optimization
---

## Minimize Active CPU Time Since Billing Pauses During I/O

With Vercel's Fluid Compute pricing, Active CPU billing pauses when your function is waiting for I/O operations (database queries, API calls, file reads). You are only billed for the milliseconds your code is actively executing on the CPU. This means I/O-heavy functions are inherently cheaper than compute-heavy ones.

**Incorrect (compute-heavy — CPU runs continuously):**

```tsx
// app/api/report/route.ts
export async function GET() {
  const data = await db.query('SELECT * FROM orders');

  // All of this is Active CPU — billed for every millisecond
  const processed = data.map(order => {
    return heavyCalculation(order); // CPU-intensive transformation
  });
  const sorted = processed.sort((a, b) => complexSort(a, b));
  const aggregated = aggregate(sorted);
  const formatted = formatReport(aggregated);

  return Response.json(formatted);
}

// 500ms CPU computation = billed for 500ms of Active CPU
```

**Correct (offload computation, minimize CPU work):**

```tsx
// app/api/report/route.ts
export async function GET() {
  // Let the database do the heavy lifting — this is I/O (not billed as CPU)
  const aggregated = await db.query(`
    SELECT category, SUM(total) as revenue, COUNT(*) as count
    FROM orders
    GROUP BY category
    ORDER BY revenue DESC
  `);

  // Minimal CPU work — just light formatting
  const formatted = aggregated.map(row => ({
    category: row.category,
    revenue: `$${row.revenue.toFixed(2)}`,
    count: row.count,
  }));

  return Response.json(formatted);
}

// 5ms CPU computation + 200ms I/O (free) = billed for 5ms of Active CPU
// 100x cheaper than the compute-heavy version
```

**Strategies to reduce Active CPU:**

1. **Push computation to the database** — SQL aggregation, sorting, filtering
2. **Use streaming responses** — CPU billing happens incrementally, not all at once
3. **Avoid synchronous heavy operations** — JSON parsing of massive payloads, image processing
4. **Pre-compute at build time** — If data is known at build, compute in `generateStaticParams` or build scripts
5. **Cache computed results** — Don't recompute what you've already computed

**Understanding the billing split:**

```
Function total time: 1000ms
├── I/O wait (DB query):  800ms → $0.00 Active CPU
├── CPU computation:      200ms → billed Active CPU
└── You pay for:          200ms (not 1000ms)

BUT: Provisioned Memory is billed for the full 1000ms
```

**When to apply:**
- Any Vercel Function or server component with computation
- API routes that process, transform, or aggregate data
- Functions that both fetch and process data

Reference: [Fluid Compute Pricing](https://vercel.com/docs/functions/usage-and-pricing)

````
