````markdown
---
title: Reduce Function Invocations Below the 1M Included Threshold
impact: CRITICAL
impactDescription: every invocation beyond 1M costs $0.60/million — caching and client-side fetching eliminate unnecessary calls
tags: invocations, function-calls, caching, client-side, threshold, 1M
---

## Reduce Function Invocations Below the 1M Included Threshold

The Pro plan includes 1M function invocations per month. Beyond that, each additional million costs $0.60. While $0.60/million seems cheap, high-traffic apps can accumulate millions of invocations from SSR pages, API routes, and ISR regenerations. The goal is to stay within the included 1M or minimize overage.

**Incorrect (every page view triggers a function invocation):**

```tsx
// app/products/page.tsx
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}

// 500K monthly visitors × 3 pages avg = 1.5M invocations
// Overage: 500K invocations × $0.60/1M = $0.30/month in invocations alone
// Plus Active CPU + Memory costs on top
```

**Correct (minimize invocations through multiple strategies):**

```tsx
// Strategy 1: Make it static (0 invocations)
// app/products/page.tsx
export default async function ProductsPage() {
  const products = await getProducts(); // build-time only
  return <ProductGrid products={products} />;
}
```

```tsx
// Strategy 2: Use ISR (minimal invocations)
// app/products/page.tsx
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductGrid products={products} />;
}
// ~720 invocations/month instead of 500K+
```

```tsx
// Strategy 3: Client-side fetching for dynamic data
// app/products/page.tsx (static shell)
export default function ProductsPage() {
  return (
    <main>
      <h1>Products</h1>
      <DynamicProductList /> {/* fetches client-side */}
    </main>
  );
}
```

```tsx
// Strategy 4: Cache API route responses
// app/api/products/route.ts
export async function GET() {
  const products = await getProducts();
  return Response.json(products, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
// 1 invocation per hour instead of per-request
```

**Invocation reduction checklist:**
1. Convert SSR pages to static or ISR where possible
2. Add `Cache-Control` headers to all API routes with shared data
3. Use client-side fetching for user-specific or real-time data
4. Avoid excessive ISR revalidation intervals (don't set `revalidate = 1`)
5. Check `Top Paths` in usage dashboard to find highest-invocation routes

**When to apply:**
- Apps approaching or exceeding 1M function invocations/month
- Any route with high traffic that doesn't need per-request freshness
- API routes called frequently by frontend polling or SWR

Reference: [Fluid Compute Pricing — Invocations](https://vercel.com/docs/functions/usage-and-pricing#invocations)

````
