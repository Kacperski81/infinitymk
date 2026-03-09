````markdown
---
title: Use ISR Instead of SSR to Cache Pages and Reduce Invocations
impact: CRITICAL
impactDescription: ISR serves cached pages from CDN and regenerates in the background, eliminating per-request function costs
tags: ISR, SSR, incremental-static-regeneration, revalidate, caching
---

## Use ISR Instead of SSR to Cache Pages and Reduce Invocations

Incremental Static Regeneration (ISR) pre-renders pages and caches them on the CDN, regenerating them in the background after the revalidation period expires. SSR runs a function on every single request. For pages that need fresh data but not real-time data, ISR dramatically reduces function invocations and compute costs.

**Incorrect (SSR on every request — function runs per visitor):**

```tsx
// app/products/[id]/page.tsx
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  return <ProductDetail product={await product.json()} />;
}

// 100K visitors/month = 100K function invocations + CPU + memory per request
```

**Correct (ISR — function runs only on revalidation):**

```tsx
// app/products/[id]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/products/${params.id}`);
  return <ProductDetail product={await product.json()} />;
}

// 100K visitors/month with hourly revalidation =
// ~720 function invocations (24 hrs × 30 days) instead of 100K
// 99.3% reduction in function costs
```

**Choosing the revalidation period:**

| Data freshness need | `revalidate` value | Function calls/month (per path) |
|---------------------|-------------------|-------------------------------|
| Near-real-time | `60` (1 min) | ~43,200 |
| Hourly updates | `3600` (1 hr) | ~720 |
| Daily updates | `86400` (1 day) | ~30 |
| Weekly updates | `604800` (1 week) | ~4 |

**When to use ISR over SSR:**
- Product pages, blog posts, listing pages
- Any page where data can be 1 minute to 1 day stale
- Pages with high traffic (cost savings multiply with traffic)
- Content updated by a CMS

**ISR-specific costs on Vercel (Pro plan):**
- ISR Reads: 1M/month included (serving cached pages)
- ISR Writes: 200K/month included (regenerating pages)
- These are far cheaper than function compute costs for SSR

Reference: [Incremental Static Regeneration](https://vercel.com/docs/incremental-static-regeneration)

````
