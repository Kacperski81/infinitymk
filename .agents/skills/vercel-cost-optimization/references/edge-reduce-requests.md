````markdown
---
title: Prevent Excessive Polling and Re-Fetching That Inflate Edge Requests
impact: HIGH
impactDescription: each fetch/poll cycle is an Edge Request — excessive polling can push you past the 1M included threshold
tags: edge-requests, polling, SWR, revalidation, refetching, 1M
---

## Prevent Excessive Polling and Re-Fetching That Inflate Edge Requests

Edge Requests are charged per network request to the CDN (1M included on Pro, then $0.50/million). Excessive client-side polling, aggressive SWR configurations, and component re-mounting can easily push you past the included threshold. Every request — to static assets, functions, images — counts as an Edge Request.

**Incorrect (aggressive polling wastes Edge Requests):**

```tsx
'use client';

import useSWR from 'swr';

export function LivePrice({ productId }: { productId: string }) {
  const { data } = useSWR(
    `/api/price/${productId}`,
    fetcher,
    {
      refreshInterval: 1000,         // Polls every 1 second!
      revalidateOnFocus: true,       // Refetches on tab focus
      revalidateOnReconnect: true,   // Refetches on reconnect
    }
  );

  return <span>${data?.price}</span>;
}

// 1 user, 1 tab open for 8 hours:
// 8 × 3600 = 28,800 Edge Requests per product per user per day
// 10 users × 30 days = 8.6M Edge Requests/month from 1 component!
```

**Correct (reasonable polling intervals):**

```tsx
'use client';

import useSWR from 'swr';

export function LivePrice({ productId }: { productId: string }) {
  const { data } = useSWR(
    `/api/price/${productId}`,
    fetcher,
    {
      refreshInterval: 60000,         // Poll every 60 seconds (not 1 second)
      revalidateOnFocus: false,       // Don't refetch on tab focus
      revalidateOnReconnect: false,   // Don't refetch on reconnect
      dedupingInterval: 30000,        // Deduplicate requests within 30s
    }
  );

  return <span>${data?.price}</span>;
}

// 1 user, 1 tab, 8 hours: 480 requests (vs 28,800)
// 10 users × 30 days: 144K Edge Requests/month (vs 8.6M)
```

**Common Edge Request inflation sources:**

| Source | Problem | Fix |
|--------|---------|-----|
| SWR/React Query `refreshInterval` | Too frequent polling | Increase to 30s–60s minimum |
| `revalidateOnFocus: true` | Refetches every tab switch | Set to `false` unless critical |
| Image re-mounting | Components re-render, images re-fetch (304s) | Stable `key` props, memoize |
| Multiple SWR hooks per page | Each hook polls independently | Consolidate into fewer endpoints |
| Favicon/manifest requests | Every navigation triggers these | Ensure proper CDN caching |

**Identifying excessive requests:**

1. Open browser DevTools → Network tab → browse your site
2. Look for repeated requests with 304 status codes (re-fetched cached content)
3. Check Vercel Usage dashboard → Edge Requests → Project breakdown
4. Use Top Paths to find the highest-request paths

**When to apply:**
- Apps using SWR, React Query, or custom polling
- Real-time dashboards or live data displays
- Apps with many images that re-render frequently
- Any app approaching 1M Edge Requests/month

Reference: [Manage CDN Usage — Edge Requests](https://vercel.com/docs/manage-cdn-usage#edge-requests)

````
