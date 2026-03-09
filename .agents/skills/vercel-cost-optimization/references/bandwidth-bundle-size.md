````markdown
---
title: Reduce JavaScript Bundles to Lower Data Transfer Costs
impact: HIGH
impactDescription: smaller JS bundles reduce Fast Data Transfer — the second largest variable cost on Vercel
tags: bundle-size, tree-shaking, dynamic-import, code-splitting, bandwidth
---

## Reduce JavaScript Bundles to Lower Data Transfer Costs

Every kilobyte of JavaScript sent to users counts as Fast Data Transfer (100 GB included on Pro, then regionally priced). Large bundles also increase Edge Requests if they're split into many chunks. Reducing bundle size directly lowers your Vercel bill.

**Incorrect (bloated bundles):**

```tsx
// Importing entire library when you need one function
import { format, parse, addDays, subDays, isValid, ... } from 'date-fns';
// Bundles entire date-fns (200KB+)

// Heavy component loaded on every page
import HeavyAnalyticsDashboard from '@/components/analytics-dashboard';
// 500KB component loaded even if user never visits analytics
```

**Correct (optimized bundles):**

```tsx
// Import only what you need (tree-shakeable)
import { format } from 'date-fns/format';
// Bundles only the format function (~2KB)

// Dynamic import — loaded only when needed
import dynamic from 'next/dynamic';
const AnalyticsDashboard = dynamic(
  () => import('@/components/analytics-dashboard'),
  { loading: () => <DashboardSkeleton /> }
);
// 0KB in initial bundle, loaded on demand
```

**Bundle optimization strategies:**

1. **Analyze your bundle** — Use `@next/bundle-analyzer` to identify large dependencies
   ```bash
   npm install @next/bundle-analyzer
   ```
   ```tsx
   // next.config.ts
   import bundleAnalyzer from '@next/bundle-analyzer';
   const withBundleAnalyzer = bundleAnalyzer({
     enabled: process.env.ANALYZE === 'true',
   });
   export default withBundleAnalyzer(nextConfig);
   ```

2. **Dynamic imports for heavy components** — Modals, charts, editors, maps
3. **Replace heavy libraries** — Use lighter alternatives
   | Heavy | Light Alternative | Savings |
   |-------|-------------------|---------|
   | `moment` (300KB) | `date-fns` tree-shaken (2-10KB) | ~290KB |
   | `lodash` (70KB) | `lodash-es` tree-shaken or native | ~60KB |
   | `chart.js` (200KB) | `recharts` lazy-loaded | Initial: 200KB |

4. **Use server components** — RSC code stays on the server, zero JS sent to client
5. **Avoid `'use client'` on large components** — Keep as much as possible server-side

**Measuring impact:**

```
100 GB Fast Data Transfer included (Pro plan)
Average page: 500KB JS → 200KB gzipped

100 GB / 200KB = 500,000 page views within included limit
Reduce to 100KB gzipped → 1,000,000 page views within limit (2× more free traffic)
```

**When to apply:**
- Any app with more than 200KB of JavaScript
- Apps using heavy charting, mapping, or editor libraries
- Before deploying to production on Vercel

Reference: [Next.js Bundle Analyzer](https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer)

````
