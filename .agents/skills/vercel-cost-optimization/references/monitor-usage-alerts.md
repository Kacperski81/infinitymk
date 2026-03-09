````markdown
---
title: Use Top Paths and Usage Alerts to Find and Fix Cost Hotspots
impact: MEDIUM
impactDescription: Top Paths reveals which routes consume the most resources — essential for targeted optimization
tags: top-paths, monitoring, usage-dashboard, alerts, optimization, diagnostics
---

## Use Top Paths and Usage Alerts to Find and Fix Cost Hotspots

The Vercel Usage dashboard's Top Paths feature shows which routes consume the most bandwidth, execution time, invocations, and requests. Instead of guessing where costs come from, use Top Paths to identify the exact routes driving your bill and optimize them first.

**Using Top Paths:**

1. Go to **Dashboard** → **Usage** tab
2. Scroll to **Top Paths** section
3. Filter by:
   - **Bandwidth** — Which paths send the most data to users
   - **Execution** — Which functions run the longest
   - **Invocations** — Which functions are called most often
   - **Requests** — Which paths get the most traffic

**Common findings and fixes:**

| Top Path Finding | Root Cause | Fix |
|------------------|------------|-----|
| `/_next/image` has high bandwidth | Unoptimized images | Reduce `quality`, add `sizes`, compress source images |
| `/api/data` has high invocations | No caching on API route | Add `Cache-Control: s-maxage=3600` |
| `/products/[id]` has high execution | SSR on every request | Switch to ISR with `revalidate` |
| `/_next/static/chunks/...` has high bandwidth | Large JS bundles | Use bundle analyzer, dynamic imports |
| `/api/webhook` has high invocations | External service calling frequently | Rate limit or batch webhook processing |

**Using Monitoring for deeper analysis:**

```
Dashboard → Monitoring tab → Select example query or custom query

Example: Bandwidth by Optimized Image
Query: request_path = '/_next/image' OR request_path = '/_vercel/image'
Add: host = 'my-site.com' for specific project

This reveals which images consume the most bandwidth.
```

**Optimization workflow:**

1. **Identify** — Check Top Paths weekly, filter by the metric that's highest
2. **Analyze** — Use Monitoring tab for detailed breakdown
3. **Optimize** — Apply the relevant reference file:
   - High bandwidth → [bandwidth-image-optimization](bandwidth-image-optimization.md), [bandwidth-bundle-size](bandwidth-bundle-size.md)
   - High execution → [func-reduce-duration](func-reduce-duration.md), [func-minimize-memory](func-minimize-memory.md)
   - High invocations → [func-reduce-invocations](func-reduce-invocations.md), [cache-cdn-headers](cache-cdn-headers.md)
   - High requests → [edge-reduce-requests](edge-reduce-requests.md)
4. **Verify** — Check Top Paths after deploying optimizations

**Usage dashboard views:**

| View | What it shows | When to use |
|------|--------------|-------------|
| Count | Total metric value | Overall trend analysis |
| Project | Per-project breakdown | Multi-project teams |
| Region | Per-region breakdown | Regional pricing optimization |
| Ratio | Cached vs uncached, success vs error | Caching effectiveness |
| Average | 24-hour average | Baseline comparison |

**When to apply:**
- Weekly during initial production deployment
- After any traffic spike
- When your Vercel bill increases unexpectedly
- Before and after optimization efforts (to measure impact)

Reference: [Manage CDN Usage — Top Paths](https://vercel.com/docs/manage-cdn-usage#top-paths), [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage)

````
