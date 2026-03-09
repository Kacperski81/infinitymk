````markdown
---
title: Understand Fluid Compute Billing — Active CPU vs Provisioned Memory
impact: CRITICAL
impactDescription: understanding the billing model is essential to optimizing costs — two distinct meters run simultaneously
tags: fluid-compute, billing, active-cpu, provisioned-memory, pricing-model
---

## Understand Fluid Compute Billing — Active CPU vs Provisioned Memory

Vercel's Fluid Compute pricing has two simultaneous billing meters for functions. Understanding when each meter runs is essential to cost optimization.

**The two meters:**

| Meter | What it measures | When it bills | Pro plan included |
|-------|-----------------|---------------|-------------------|
| **Active CPU** | CPU computation time | Only while code executes (pauses during I/O) | 4 hours / month |
| **Provisioned Memory** | Memory allocated to instance | Continuously while instance handles requests (including I/O) | 360 GB-hrs / month |

**How they work together:**

```
Request arrives → Instance starts
│
├── [CPU: parsing request]     → Active CPU ✓  Memory ✓
├── [I/O: database query]      → Active CPU ✗  Memory ✓  (CPU pauses!)
├── [CPU: format response]     → Active CPU ✓  Memory ✓
├── [I/O: external API call]   → Active CPU ✗  Memory ✓  (CPU pauses!)
├── [CPU: send response]       → Active CPU ✓  Memory ✓
│
└── No more requests → Instance pauses → Both meters stop
```

**Cost calculation example (iad1 — cheapest region):**

```
Function: 1 GB memory, 100ms CPU, 500ms total (400ms I/O wait)

Active CPU cost:   (0.1s / 3600) × $0.128/hr = $0.0000036
Memory cost:       (1 GB × 0.5s / 3600) × $0.0106/GB-hr = $0.0000015
Total per request: $0.0000051

At 1M requests/month: $5.10 (after included credits)
```

**Optimization implications:**

1. **I/O-heavy functions are cheaper than compute-heavy ones**
   - A function that waits 900ms for a DB and computes 100ms costs the same CPU as one that computes 100ms total
   - Memory cost is higher for the I/O-heavy one (900ms vs 100ms instance time)

2. **Optimized Concurrency reduces memory costs**
   - Fluid Compute allows one instance to handle multiple requests concurrently
   - Memory is shared across concurrent requests in the same instance
   - 10 concurrent requests on 1 instance = 1× memory cost (not 10×)

3. **Instance reuse matters**
   - After a request completes, the instance stays warm briefly
   - New requests reuse the same instance — no cold start, shared memory billing
   - Bursty traffic is cheaper than evenly spread traffic (more reuse)

**Key formulas:**

$$\text{CPU Cost} = \frac{\text{Active CPU seconds}}{3600} \times \text{Regional CPU rate}$$

$$\text{Memory Cost} = \frac{\text{Memory (GB)} \times \text{Instance seconds}}{3600} \times \text{Regional Memory rate}$$

$$\text{Total} = \text{CPU Cost} + \text{Memory Cost} + \text{Invocation Cost}$$

**When to apply:**
- Deciding between compute-heavy vs I/O-heavy architectures
- Choosing function memory sizes
- Estimating costs for new features
- Understanding why your Vercel bill increased

Reference: [Fluid Compute Pricing](https://vercel.com/docs/functions/usage-and-pricing)

````
