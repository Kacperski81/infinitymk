````markdown
---
title: Deploy Functions to the Cheapest Vercel Regions
impact: MEDIUM
impactDescription: regional pricing varies up to 73% — choosing the right region can significantly reduce compute costs
tags: regions, pricing, iad1, cle1, pdx1, function-region, deployment
---

## Deploy Functions to the Cheapest Vercel Regions

Vercel charges different rates for Active CPU and Provisioned Memory depending on the region where your function runs. The cheapest regions are up to 73% less expensive than the most expensive ones. If your users or data sources are flexible on latency, choosing a cheaper region saves money.

**Regional pricing comparison (Active CPU / Provisioned Memory per hour):**

| Region | CPU $/hr | Memory $/GB-hr | Cost Tier |
|--------|---------|----------------|-----------|
| Washington, D.C. (iad1) | $0.128 | $0.0106 | **Cheapest** |
| Cleveland (cle1) | $0.128 | $0.0106 | **Cheapest** |
| Portland (pdx1) | $0.128 | $0.0106 | **Cheapest** |
| Mumbai (bom1) | $0.140 | $0.0116 | Low |
| Montréal (yul1) | $0.147 | $0.0121 | Low |
| Singapore (sin1) | $0.160 | $0.0133 | Medium |
| Stockholm (arn1) | $0.160 | $0.0133 | Medium |
| Dublin (dub1) | $0.168 | $0.0139 | Medium |
| Seoul (icn1) | $0.169 | $0.0140 | Medium |
| San Francisco (sfo1) | $0.177 | $0.0147 | Medium |
| London (lhr1) | $0.177 | $0.0146 | Medium |
| Paris (cdg1) | $0.177 | $0.0146 | Medium |
| Hong Kong (hkg1) | $0.176 | $0.0146 | Medium |
| Sydney (syd1) | $0.180 | $0.0149 | High |
| Frankfurt (fra1) | $0.184 | $0.0152 | High |
| Dubai (dxb1) | $0.185 | $0.0153 | High |
| Cape Town (cpt1) | $0.200 | $0.0166 | High |
| Tokyo (hnd1) | $0.202 | $0.0167 | Expensive |
| Osaka (kix1) | $0.202 | $0.0167 | Expensive |
| São Paulo (gru1) | $0.221 | $0.0183 | **Most Expensive** |

**Configuring function region in Next.js:**

```tsx
// app/api/heavy-task/route.ts
// Deploy this function to the cheapest region
export const preferredRegion = 'iad1'; // Washington, D.C. — cheapest

export async function POST(request: Request) {
  // Your function logic
}
```

```tsx
// next.config.ts — set default region for all functions
const nextConfig = {
  experimental: {
    // Default all functions to cheapest region
    preferredRegion: 'iad1',
  },
};
```

**Region selection strategy:**

| Scenario | Recommended Region | Rationale |
|----------|-------------------|-----------|
| US-based users, US database | `iad1` / `cle1` / `pdx1` | Cheapest + low latency |
| EU users, EU database | `dub1` | Cheapest EU option |
| Global users, cost is priority | `iad1` | Cheapest, CDN handles user proximity |
| Global users, latency is priority | Multiple regions | Higher cost, lower latency |
| Database in São Paulo | `gru1` | Must co-locate, but most expensive |

**Key insight:** Vercel's CDN serves static/cached content from the edge nearest to the user regardless of function region. The function region only matters for uncached server-rendered content and API calls. For most apps, deploying functions to `iad1` and relying on CDN caching gives you the cheapest compute with good user experience.

**Cost savings example:**

```
1 hour of Active CPU/month:
  iad1: $0.128
  gru1: $0.221
  Savings: $0.093/hr (42% cheaper)

At 10 hours/month:
  iad1: $1.28
  gru1: $2.21
  Savings: $0.93/month
```

**When to apply:**
- Setting up a new Vercel project
- Apps where function latency is less critical than cost
- Background processing, cron jobs, webhooks
- Any function that doesn't need to be near the user

Reference: [Regional Pricing](https://vercel.com/docs/pricing/regional-pricing), [Fluid Compute Regional Pricing](https://vercel.com/docs/functions/usage-and-pricing#regional-pricing)

````
