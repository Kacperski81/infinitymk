````markdown
---
title: Move Dynamic Data to Client Components to Keep Pages Static
impact: CRITICAL
impactDescription: prevents entire pages from becoming SSR when only a small part needs dynamic data
tags: client-components, SSR, static, dynamic, use-client, partial
---

## Move Dynamic Data to Client Components to Keep Pages Static

A common cost mistake is making an entire page server-rendered just because one small part needs dynamic data (e.g., a user greeting, live counter, or cart badge). Instead, keep the page static and move dynamic parts into client components that fetch data on the client side.

**Incorrect (entire page becomes SSR because of one dynamic element):**

```tsx
// app/page.tsx — this entire page is now SSR
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const user = await getCurrentUser(); // needs cookies/session
  const products = await getProducts(); // static data

  return (
    <main>
      <p>Welcome, {user.name}</p>
      <ProductGrid products={products} />
    </main>
  );
}

// Every visit: Function Invocation + CPU + Memory + Origin Transfer
```

**Correct (static page with dynamic client component):**

```tsx
// app/page.tsx — remains static, zero function cost
export default async function HomePage() {
  const products = await getProducts(); // fetched at build time

  return (
    <main>
      <UserGreeting /> {/* client component handles dynamic data */}
      <ProductGrid products={products} />
    </main>
  );
}
```

```tsx
// components/user-greeting.tsx
'use client';

import { useEffect, useState } from 'react';

export function UserGreeting() {
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/me').then(r => r.json()).then(u => setName(u.name));
  }, []);

  if (!name) return null;
  return <p>Welcome, {name}</p>;
}
```

**Pattern: Static page + client-side dynamic islands:**
- Keep the page component static (no `dynamic = 'force-dynamic'`, no cookies/headers access)
- Extract user-specific or real-time data into `'use client'` components
- Those client components call API routes or external APIs
- The page itself is served from CDN at near-zero cost

**When to apply:**
- User-specific data on otherwise static pages (auth state, cart count)
- Live counters, stock tickers, or real-time data widgets
- Any page where 90%+ of content is static
- Search results where the form/filters are dynamic but the page shell is static

Reference: [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage)

````
