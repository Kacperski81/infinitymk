````markdown
---
title: Use Stale-While-Revalidate for Instant Responses with Background Refresh
impact: CRITICAL
impactDescription: serves cached content instantly while regenerating in the background, avoiding function costs for most requests
tags: stale-while-revalidate, SWR, caching, background, revalidation
---

## Use Stale-While-Revalidate for Instant Responses with Background Refresh

The `stale-while-revalidate` directive serves cached (potentially stale) content immediately to the user while triggering a background regeneration. This means users always get instant responses (from cache), and the cache is updated asynchronously. Only the background regeneration incurs function costs — the vast majority of requests are served from CDN at near-zero cost.

**Incorrect (no SWR — users wait for regeneration, or cache misses hit functions):**

```tsx
// app/api/feed/route.ts
export async function GET() {
  const feed = await fetchFeed();
  return Response.json(feed, {
    headers: {
      'Cache-Control': 'public, s-maxage=60',
      // After 60s, next request WAITS for function to regenerate
      // User experiences latency, and you pay for the function call
    },
  });
}
```

**Correct (SWR — instant response, background refresh):**

```tsx
// app/api/feed/route.ts
export async function GET() {
  const feed = await fetchFeed();
  return Response.json(feed, {
    headers: {
      // Serve from cache for 60s, then serve stale for up to 24hrs
      // while regenerating in background
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=86400',
    },
  });
}

// User always gets instant CDN response
// Background regeneration runs only once per stale window
// If no traffic during stale window, no function runs at all
```

**How it works on Vercel:**

1. Request arrives → CDN has cached response (age < `s-maxage`) → Serve from cache. **$0 compute.**
2. Request arrives → Cache is stale (age > `s-maxage` but < `s-maxage + stale-while-revalidate`) → Serve stale response instantly, trigger background revalidation. **User gets instant response, one function runs in background.**
3. Request arrives → Cache is expired (age > `s-maxage + stale-while-revalidate`) → Function runs, user waits. **Full function cost.**

**The cost savings are in step 2:** most requests in a busy app fall here, meaning users get CDN-speed responses and you pay for background regeneration only once.

**Recommended patterns:**

| Scenario | Cache-Control | Behavior |
|----------|--------------|----------|
| Frequently updated data | `s-maxage=10, stale-while-revalidate=3600` | Fresh every 10s, stale OK for 1hr |
| Hourly updates | `s-maxage=3600, stale-while-revalidate=86400` | Fresh hourly, stale OK for 1 day |
| Rarely changing data | `s-maxage=86400, stale-while-revalidate=604800` | Fresh daily, stale OK for 1 week |

**When to apply:**
- API routes with non-critical freshness requirements
- Product listings, blog feeds, dashboards
- Any endpoint where showing slightly stale data is acceptable
- High-traffic endpoints where you want to minimize function invocations

Reference: [CDN Cache](https://vercel.com/docs/cdn-cache), [Stale-While-Revalidate](https://vercel.com/docs/cdn-cache)

````
