````markdown
---
title: Right-Size Function Memory Allocation to Reduce GB-Hour Costs
impact: CRITICAL
impactDescription: Provisioned Memory is billed continuously for the entire instance lifetime, not just during execution
tags: memory, GB-hours, provisioned, function-config, right-sizing
---

## Right-Size Function Memory Allocation to Reduce GB-Hour Costs

Provisioned Memory is billed for the entire lifetime of a function instance — from the moment the first request arrives until the last in-flight request completes. Unlike Active CPU, memory billing does NOT pause during I/O. Over-allocating memory directly increases costs for every second your function instance is alive.

**Incorrect (default or excessive memory for a simple function):**

```tsx
// app/api/hello/route.ts

// Default memory is 1024 MB — way too much for a simple response
export async function GET() {
  return Response.json({ message: 'Hello' });
}

// Cost: 1 GB × instance lifetime × $0.0106/GB-hr (iad1)
```

**Correct (right-sized memory):**

```tsx
// app/api/hello/route.ts

// Explicitly set memory to the minimum needed
export const memory = 128; // MB — sufficient for simple API responses

export async function GET() {
  return Response.json({ message: 'Hello' });
}

// Cost: 0.128 GB × instance lifetime × $0.0106/GB-hr (iad1)
// 8x cheaper than 1024 MB
```

**Memory configuration in Next.js:**

```tsx
// Per-route configuration in route handlers or page files
export const memory = 256; // 128, 256, 512, 1024, 2048, 3008 MB

// Or in next.config.ts for all functions
const nextConfig = {
  experimental: {
    serverFunctionMemory: 256,
  },
};
```

**Memory sizing guidelines:**

| Use Case | Recommended Memory | Rationale |
|----------|-------------------|-----------|
| Simple JSON API responses | 128–256 MB | Minimal processing |
| Database queries + light formatting | 256–512 MB | Query results need buffer |
| Server-rendered pages (RSC) | 512–1024 MB | React rendering + data |
| Image processing / file manipulation | 1024–3008 MB | Large buffers needed |
| AI/ML inference | 2048–3008 MB | Model loading |

**Key insight — memory billing continues during I/O:**

```
Function timeline:
├── [Request 1: DB query 500ms] ── Memory billed for 500ms
├── [Request 2: API call 300ms]─── Memory billed for 300ms
└── Total memory bill: 800ms of instance time at configured memory size

Active CPU bill: Only actual computation time (maybe 50ms total)
Memory bill: Full 800ms × memory size
```

**When to apply:**
- Every Vercel Function — always explicitly set memory
- Review and reduce memory on functions with high invocation counts
- Use the Vercel Usage dashboard to check Provisioned Memory consumption

Reference: [Fluid Compute Pricing — Provisioned Memory](https://vercel.com/docs/functions/usage-and-pricing#provisioned-memory)

````
