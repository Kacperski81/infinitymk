````markdown
---
title: Default to Static Pages to Avoid Function Costs
impact: CRITICAL
impactDescription: static pages incur zero function costs — only Edge Requests and Fast Data Transfer
tags: static, SSG, rendering, cost, pages, build-time
---

## Default to Static Pages to Avoid Function Costs

Static pages are pre-rendered at build time and served directly from Vercel's CDN. They only incur Edge Requests and Fast Data Transfer — no Function Invocations, Active CPU, Provisioned Memory, or Fast Origin Transfer. This makes static pages the cheapest rendering strategy on Vercel by a large margin.

**Incorrect (unnecessary SSR — every request invokes a function):**

```tsx
// app/about/page.tsx
export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  // This data rarely changes, yet every visitor triggers a function
  const team = await fetch('https://api.example.com/team').then(r => r.json());
  return <TeamSection members={team} />;
}

// Cost per visit: Edge Request + Fast Data Transfer + Function Invocation
//                + Active CPU + Provisioned Memory + Fast Origin Transfer
```

**Correct (static generation — zero function cost):**

```tsx
// app/about/page.tsx
export default async function AboutPage() {
  // Fetched once at build time, served from CDN forever (or until redeployed)
  const team = await fetch('https://api.example.com/team').then(r => r.json());
  return <TeamSection members={team} />;
}

// Cost per visit: Edge Request + Fast Data Transfer only
// Function cost: $0
```

**When to prefer static:**
- Content pages (about, docs, blog posts, marketing)
- Pages where data changes only on deploy
- Any page where you can move dynamic parts to client components
- Pages with data that can be fetched at build time

**Cost comparison (1M page views/month on Pro):**
- Static: ~$0 extra (within included Edge Requests + Fast Data Transfer)
- SSR: 1M function invocations (~$0) + Active CPU + Memory (potentially $10–50+)

Reference: [Calculating Usage of Resources](https://vercel.com/docs/pricing/how-does-vercel-calculate-usage-of-resources)

````
