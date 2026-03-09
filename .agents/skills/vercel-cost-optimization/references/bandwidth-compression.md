````markdown
---
title: Minimize Response Sizes for Lower Fast Data Transfer Bills
impact: HIGH
impactDescription: Fast Data Transfer is charged on the full HTTP response size — smaller responses directly reduce costs
tags: compression, response-size, bandwidth, fast-data-transfer, gzip, brotli
---

## Minimize Response Sizes for Lower Fast Data Transfer Bills

Fast Data Transfer is calculated on the full size of each HTTP response transmitted from Vercel's CDN to users — including body, headers, and URL. Vercel automatically applies compression (Brotli/gzip), but you can further reduce response sizes by optimizing what you send.

**Incorrect (bloated API responses):**

```tsx
// app/api/products/route.ts
export async function GET() {
  // Returns ALL fields including internal data
  const products = await db.products.findMany({
    include: {
      internalNotes: true,    // not needed by frontend
      auditLog: true,         // not needed by frontend
      supplierDetails: true,  // not needed by frontend
    },
  });

  return Response.json(products);
  // 500KB response when 50KB would suffice
}
```

**Correct (lean API responses):**

```tsx
// app/api/products/route.ts
export async function GET() {
  // Select only fields the frontend needs
  const products = await db.products.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      imageUrl: true,
      slug: true,
    },
  });

  return Response.json(products);
  // 50KB response — 10× smaller
}
```

**Response size optimization strategies:**

1. **Select only needed fields** — Don't return entire database rows
2. **Paginate large lists** — Return 20 items per page, not 10,000
   ```tsx
   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const page = Number(searchParams.get('page') ?? 1);
     const limit = 20;

     const products = await db.products.findMany({
       take: limit,
       skip: (page - 1) * limit,
       select: { id: true, name: true, price: true },
     });

     return Response.json(products);
   }
   ```
3. **Use ETag/If-Modified-Since** — Prevents duplicate data transmission (Next.js enables this by default). Returns 304 with no body if content hasn't changed.
4. **Minimize HTML payloads** — Server-rendered pages with excessive inline data increase transfer
5. **Remove unnecessary headers** — Custom headers add to transferred bytes

**Understanding Fast Data Transfer calculation:**

```
Fast Data Transfer = Full HTTP Response Size
├── Response body (HTML, JSON, assets)
├── Response headers
├── URL
└── Compression applied by Vercel

Pro plan: 100 GB/month included
Beyond: Regionally priced (varies by where users are located)
```

**When to apply:**
- API routes returning JSON data
- Server-rendered pages with large data payloads
- Any endpoint serving frequent responses to many users

Reference: [Manage CDN Usage — Fast Data Transfer](https://vercel.com/docs/manage-cdn-usage#fast-data-transfer)

````
