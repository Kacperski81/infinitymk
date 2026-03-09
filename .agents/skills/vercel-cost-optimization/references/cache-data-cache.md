````markdown
---
title: Use Fetch with Revalidate to Leverage Vercel's Data Cache
impact: CRITICAL
impactDescription: Data Cache stores fetch responses on Vercel's edge, avoiding redundant API calls and function compute
tags: data-cache, fetch, revalidate, next-revalidate, cache, force-cache
---

## Use Fetch with Revalidate to Leverage Vercel's Data Cache

Next.js on Vercel extends `fetch()` with built-in caching via the Data Cache (previously called Runtime Cache). By setting `next.revalidate` or `cache: 'force-cache'`, fetch responses are cached on Vercel's infrastructure and reused across requests. This eliminates redundant API calls, reduces function Active CPU time, and lowers Fast Origin Transfer.

**Incorrect (no caching — fetches from origin on every request):**

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // Every request fetches from the API — every visitor pays for this
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store',
  });
  const products = await res.json();
  return <ProductGrid products={products} />;
}
```

**Correct (Data Cache — fetches once, serves from cache):**

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // Cached on Vercel's Data Cache, revalidated every hour
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 },
  });
  const products = await res.json();
  return <ProductGrid products={products} />;
}
```

**Also correct (cache forever until manual revalidation):**

```tsx
// app/products/page.tsx
export default async function ProductsPage() {
  // Cached indefinitely, revalidate on-demand with revalidateTag()
  const res = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] },
  });
  const products = await res.json();
  return <ProductGrid products={products} />;
}
```

```tsx
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('products'); // Only revalidate when data actually changes
  return Response.json({ revalidated: true });
}
```

**Fetch caching options:**

| Option | Behavior | Cost Impact |
|--------|----------|-------------|
| `cache: 'force-cache'` | Cache forever (default in many cases) | Lowest — one fetch ever |
| `next: { revalidate: N }` | Cache for N seconds, then refetch | Low — periodic refetch |
| `next: { tags: ['x'] }` | Cache until `revalidateTag('x')` called | Lowest — on-demand only |
| `cache: 'no-store'` | Never cache, always fetch | Highest — every request |

**When to apply:**
- Any `fetch()` call in server components or route handlers
- External API calls that return shared data
- CMS content fetching
- Database queries wrapped in fetch-compatible functions

Reference: [Vercel Runtime Cache](https://vercel.com/docs/runtime-cache)

````
