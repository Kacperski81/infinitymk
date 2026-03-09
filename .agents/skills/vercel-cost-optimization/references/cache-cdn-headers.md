````markdown
---
title: Set Cache-Control Headers on Function Responses to Serve from CDN
impact: CRITICAL
impactDescription: cached responses are served from the CDN edge without invoking functions, eliminating compute and origin transfer costs
tags: cache-control, s-maxage, CDN, headers, functions, API routes
---

## Set Cache-Control Headers on Function Responses to Serve from CDN

When a Vercel Function response includes proper `Cache-Control` headers with `s-maxage`, Vercel's CDN caches the response. Subsequent requests are served directly from the CDN cache — no function invocation, no Active CPU, no Provisioned Memory, no Fast Origin Transfer. This is one of the highest-impact optimizations for reducing costs.

**Incorrect (no caching — function runs on every request):**

```tsx
// app/api/products/route.ts
export async function GET() {
  const products = await db.products.findMany();
  return Response.json(products);
}

// Every request: Function Invocation + CPU + Memory + Origin Transfer
// 100K requests/month = 100K function invocations
```

**Correct (CDN-cached — function runs only when cache expires):**

```tsx
// app/api/products/route.ts
export async function GET() {
  const products = await db.products.findMany();

  return Response.json(products, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}

// First request: Function invocation (cached at CDN)
// Next 3600 seconds: Served from CDN cache ($0 compute cost)
// After 3600s: Stale content served instantly, revalidated in background
```

**Cache-Control header patterns:**

| Pattern | Use Case | Cost Impact |
|---------|----------|-------------|
| `s-maxage=60` | Data updates every minute | ~720 invocations/month per path |
| `s-maxage=3600` | Hourly freshness sufficient | ~720 invocations/month per path |
| `s-maxage=86400` | Daily updates | ~30 invocations/month per path |
| `s-maxage=3600, stale-while-revalidate=86400` | Hourly + instant stale fallback | Best UX + cost balance |
| `s-maxage=31536000, immutable` | Never changes (versioned assets) | 1 invocation ever |

**Key distinctions:**
- `max-age`: Controls browser cache (client-side)
- `s-maxage`: Controls CDN/shared cache (Vercel CDN) — this is what reduces your bill
- `stale-while-revalidate`: Serves stale content while regenerating (keeps UX fast)

**When to apply:**
- API routes returning shared data (not user-specific)
- Public JSON endpoints
- Any route handler where the response is the same for all users
- Webhook endpoints that return status responses

**Important:** Do NOT cache user-specific responses (e.g., `/api/me`). Only cache shared/public data.

Reference: [CDN Cache Headers](https://vercel.com/docs/cdn-cache)

````
