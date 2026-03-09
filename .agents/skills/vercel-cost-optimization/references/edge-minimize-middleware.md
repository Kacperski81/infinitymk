````markdown
---
title: Restrict Middleware to Necessary Paths to Avoid Double Billing
impact: HIGH
impactDescription: middleware runs on every matched request and can double Fast Origin Transfer if misconfigured
tags: middleware, matcher, edge, paths, billing, fast-origin-transfer
---

## Restrict Middleware to Necessary Paths to Avoid Double Billing

Middleware on Vercel runs before every matched request. If not restricted with a `matcher`, it runs on ALL requests — including static assets, images, and API routes. This can double your Fast Origin Transfer costs because data travels through both middleware and the target function. Middleware also adds to Edge Request CPU Duration.

**Incorrect (middleware runs on every request):**

```tsx
// middleware.ts — no matcher, runs on EVERYTHING
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Auth check — but runs on every CSS, JS, image, favicon request too
  const token = request.cookies.get('token');
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// No matcher = runs on ALL requests
// Static assets, _next/static/*, images all go through middleware
// Each request: middleware I/O + target handler I/O = double Fast Origin Transfer
```

**Correct (middleware restricted to necessary paths):**

```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// Matcher restricts middleware to only dashboard routes
export const config = {
  matcher: ['/dashboard/:path*', '/api/dashboard/:path*'],
};

// Static assets, public images, and other routes skip middleware entirely
// Fast Origin Transfer incurred only on matched paths
```

**Matcher patterns for cost optimization:**

```tsx
export const config = {
  matcher: [
    // Only run on specific paths
    '/dashboard/:path*',
    '/api/protected/:path*',

    // Or exclude static files explicitly
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
```

**Cost impact of unmatched middleware:**

| Scenario | Monthly Requests | Extra Fast Origin Transfer |
|----------|-----------------|---------------------------|
| 100K page views, no matcher | ~500K total requests (with assets) × middleware overhead | Significant |
| 100K page views, matcher on `/dashboard` | ~10K matched requests | Minimal |

**When to apply:**
- Any app using middleware
- Auth/redirect middleware (most common case)
- A/B testing middleware
- Geolocation-based routing middleware

Reference: [Next.js Middleware Matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher), [Manage CDN Usage — Middleware](https://vercel.com/docs/manage-cdn-usage#middleware)

````
