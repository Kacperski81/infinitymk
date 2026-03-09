```skill
---
name: vercel-cost-optimization
description: Vercel cost optimization and pricing best practices for web applications. Use when deploying to Vercel, configuring rendering strategies, optimizing functions, caching, or reducing hosting costs. Triggers on tasks involving Vercel pricing, spend management, ISR, SSR, static generation, bandwidth optimization, or function configuration.
---

# Vercel Cost Optimization

Comprehensive guide to minimizing Vercel hosting costs based on official Vercel pricing documentation and best practices. Contains 18 rules across 7 categories, prioritized by cost impact. Focuses on the Pro plan ($20/mo) as the primary optimization target.

## When to Apply

Reference these guidelines when:
- Deploying a Next.js or any framework app to Vercel
- Choosing between static generation, ISR, and SSR
- Configuring Vercel Functions (memory, duration, region)
- Optimizing bandwidth and data transfer costs
- Setting up caching strategies for API routes and pages
- Analyzing Vercel usage dashboard for cost spikes
- Configuring middleware or edge functions
- Choosing deployment regions

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Rendering Strategy | CRITICAL | `render-` |
| 2 | Caching | CRITICAL | `cache-` |
| 3 | Function Optimization | CRITICAL | `func-` |
| 4 | Bandwidth & Transfer | HIGH | `bandwidth-` |
| 5 | Edge & Middleware | HIGH | `edge-` |
| 6 | Region Selection | MEDIUM | `region-` |
| 7 | Spend Monitoring | MEDIUM | `monitor-` |

## Quick Reference

### 1. Rendering Strategy (CRITICAL)

- [`render-prefer-static`](references/render-prefer-static.md) - Default to static pages to avoid function costs entirely
- [`render-isr-over-ssr`](references/render-isr-over-ssr.md) - Use ISR instead of SSR to cache pages and reduce invocations
- [`render-avoid-unnecessary-ssr`](references/render-avoid-unnecessary-ssr.md) - Move dynamic data to client components to keep pages static

### 2. Caching (CRITICAL)

- [`cache-cdn-headers`](references/cache-cdn-headers.md) - Set Cache-Control headers on function responses to serve from CDN
- [`cache-data-cache`](references/cache-data-cache.md) - Use fetch with revalidate to leverage Vercel's Data Cache
- [`cache-stale-while-revalidate`](references/cache-stale-while-revalidate.md) - Serve stale content while regenerating in the background

### 3. Function Optimization (CRITICAL)

- [`func-reduce-duration`](references/func-reduce-duration.md) - Minimize Active CPU time since billing pauses during I/O
- [`func-minimize-memory`](references/func-minimize-memory.md) - Right-size function memory allocation to reduce GB-hour costs
- [`func-reduce-invocations`](references/func-reduce-invocations.md) - Reduce function calls below the 1M included threshold
- [`func-fluid-compute`](references/func-fluid-compute.md) - Understand Fluid Compute billing: Active CPU vs Provisioned Memory

### 4. Bandwidth & Transfer (HIGH)

- [`bandwidth-image-optimization`](references/bandwidth-image-optimization.md) - Optimize images to reduce Fast Data Transfer and transformation costs
- [`bandwidth-bundle-size`](references/bandwidth-bundle-size.md) - Reduce JavaScript bundles to lower data transfer costs
- [`bandwidth-compression`](references/bandwidth-compression.md) - Minimize response sizes for lower Fast Data Transfer bills

### 5. Edge & Middleware (HIGH)

- [`edge-minimize-middleware`](references/edge-minimize-middleware.md) - Restrict middleware to necessary paths to avoid double billing
- [`edge-reduce-requests`](references/edge-reduce-requests.md) - Prevent excessive polling and re-fetching that inflate Edge Requests

### 6. Region Selection (MEDIUM)

- [`region-cheapest-regions`](references/region-cheapest-regions.md) - Deploy functions to the cheapest Vercel regions

### 7. Spend Monitoring (MEDIUM)

- [`monitor-spend-management`](references/monitor-spend-management.md) - Configure spend limits and auto-pause to prevent bill surprises
- [`monitor-usage-alerts`](references/monitor-usage-alerts.md) - Use Top Paths and alerts to find and fix cost hotspots

## Pro Plan Included Limits

| Resource | Included (Pro) | Overage Price |
|----------|---------------|---------------|
| Edge Requests | 1M / month | $0.50 per million |
| Fast Data Transfer | 100 GB / month | Regional pricing |
| Fast Origin Transfer | 10 GB / month | Regional pricing |
| Function Active CPU | 4 hours / month | Regional pricing (~$0.128/hr cheapest) |
| Function Provisioned Memory | 360 GB-hrs / month | Regional pricing (~$0.0106/GB-hr cheapest) |
| Function Invocations | 1M / month | $0.60 per million |
| ISR Reads | 1M / month | Usage-based |
| ISR Writes | 200K / month | Usage-based |
| Image Transformations | 5K / month | Usage-based |
| Image Cache Reads | 300K / month | Usage-based |
| Image Cache Writes | 100K / month | Usage-based |
| Blob Storage | 1 GB / month | Usage-based |
| Web Analytics Events | 50K / month | Usage-based |
| Speed Insights Events | 10K / month | Usage-based |

## Cost Hierarchy (What Costs the Most)

1. **Function Compute** (Active CPU + Memory) — Largest variable cost. SSR on every request is the #1 cost driver.
2. **Fast Data Transfer** — Bandwidth from CDN to users. Large images and bundles inflate this.
3. **Fast Origin Transfer** — Data between functions and CDN. Uncached function responses multiply this.
4. **Function Invocations** — Per-request charges after 1M. Excessive polling/SSR drives this up.
5. **Edge Requests** — Per-request CDN charges after 1M. Usually manageable unless excessive re-fetching.
6. **Image Optimization** — Transformations beyond 5K/mo. Unoptimized source images waste quota.

## Resources

- [Vercel Pricing](https://vercel.com/pricing)
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage)
- [Calculating Resource Usage](https://vercel.com/docs/pricing/how-does-vercel-calculate-usage-of-resources)
- [Fluid Compute Pricing](https://vercel.com/docs/functions/usage-and-pricing)
- [Regional Pricing](https://vercel.com/docs/pricing/regional-pricing)
- [Manage CDN Usage](https://vercel.com/docs/manage-cdn-usage)
- [Image Optimization Costs](https://vercel.com/docs/image-optimization/managing-image-optimization-costs)

```
