````markdown
---
title: Optimize Images to Reduce Fast Data Transfer and Transformation Costs
impact: HIGH
impactDescription: images are often the largest bandwidth consumer — optimization reduces Fast Data Transfer and stays within 5K transformation limit
tags: images, next-image, optimization, WebP, AVIF, bandwidth, transformations
---

## Optimize Images to Reduce Fast Data Transfer and Transformation Costs

Images typically account for the largest share of Fast Data Transfer (bandwidth from CDN to users). Vercel's Image Optimization automatically serves modern formats (WebP/AVIF) and resizes images, but the Pro plan only includes 5,000 transformations/month. Properly configured images reduce both bandwidth costs and transformation usage.

**Incorrect (unoptimized images — massive bandwidth):**

```tsx
// Large source image served at full size
<img src="/hero.png" alt="Hero" />
// • 2MB PNG served to every visitor
// • No responsive sizing — mobile gets desktop-sized image
// • No modern format — PNG instead of WebP/AVIF
// • Each unique size/format combo uses a transformation
```

**Correct (optimized with next/image):**

```tsx
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Hero"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
  quality={75}
  priority // above-the-fold image
/>

// • Automatically serves WebP/AVIF (60-80% smaller than PNG)
// • Responsive — mobile gets a smaller image
// • quality={75} reduces file size with minimal visual impact
// • Transformation cached for reuse (Image Cache Reads: 300K included)
```

**Image optimization checklist:**

1. **Always use `next/image`** — enables automatic format conversion and resizing
2. **Set `sizes` prop** — prevents serving oversized images to small viewports
3. **Use `quality={75}`** — default is 75, but explicitly set it to avoid surprises
4. **Optimize source images** — compress before uploading (TinyPNG, Squoosh)
5. **Use appropriate formats** — SVG for icons/logos, WebP/AVIF for photos
6. **Limit unique image dimensions** — each unique width × format = 1 transformation
7. **Use `placeholder="blur"`** — improves UX without extra bandwidth

**Transformation budget management (5K/month on Pro):**

| Strategy | Transformations Used |
|----------|---------------------|
| 50 images × 3 sizes × 2 formats | 300 (safe) |
| 500 images × 5 sizes × 2 formats | 5,000 (at limit) |
| 1000 images × 5 sizes × 2 formats | 10,000 (overage!) |

**Reducing transformation count:**
- Use fewer `sizes` breakpoints (3 is usually enough)
- Use `unoptimized` prop for already-optimized SVGs and GIFs
- External images with `remotePatterns` — only add what you need

**When to apply:**
- Any page with images (virtually every page)
- E-commerce product images, galleries, hero sections
- Blog post featured images
- User-generated content with images

Reference: [Image Optimization Costs](https://vercel.com/docs/image-optimization/managing-image-optimization-costs)

````
