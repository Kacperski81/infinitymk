---
name: scroll-driven-animations
description: Native CSS Scroll-Driven Animations using scroll() and view() timelines. Use when implementing scroll-linked motion, parallax, scroll progress bars, reveal-on-scroll, or any animation tied to scroll position — without JavaScript.
---

# CSS Scroll-Driven Animations

Native CSS scroll-driven animations run entirely on the compositor thread, delivering jank-free scroll-linked motion without a single line of JavaScript. Prefer these over `scroll` event listeners, `requestAnimationFrame` loops, or `IntersectionObserver`-based reveals whenever browser support allows.

## When to Apply

Reference these guidelines when:
- Building scroll progress indicators
- Implementing reveal-on-scroll / fade-in effects
- Creating parallax or scroll-linked motion
- Showing scroll shadows on overflow containers
- Detecting scroll direction for header show/hide
- Syncing animations across non-ancestor elements

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Timeline Selection | CRITICAL | `timeline-` |
| 2 | Range Control | HIGH | `range-` |
| 3 | Named Timelines & Scoping | HIGH | `naming-` |
| 4 | Practical Patterns | MEDIUM | `pattern-` |
| 5 | Performance & Fallbacks | MEDIUM | `perf-` |

## Quick Reference

### 1. Timeline Selection (CRITICAL)

- [`timeline-scroll`](references/timeline-scroll.md) — Use `animation-timeline: scroll()` for scroll-progress animations
- [`timeline-view`](references/timeline-view.md) — Use `animation-timeline: view()` for enter/exit viewport animations

### 2. Range Control (HIGH)

- [`range-basics`](references/range-basics.md) — Use `animation-range` to control when animations start and end

### 3. Named Timelines & Scoping (HIGH)

- [`naming-timelines`](references/naming-timelines.md) — Use named timelines to animate non-descendant elements

### 4. Practical Patterns (MEDIUM)

- [`pattern-progress-bar`](references/pattern-progress-bar.md) — Reading progress bar tied to page scroll
- [`pattern-scroll-reveal`](references/pattern-scroll-reveal.md) — Fade/slide elements in as they enter the viewport
- [`pattern-parallax`](references/pattern-parallax.md) — Parallax effects using scroll timelines
- [`pattern-scroll-shadows`](references/pattern-scroll-shadows.md) — Show shadows only when content is scrollable
- [`pattern-header-hide`](references/pattern-header-hide.md) — Hide/show header based on scroll direction

### 5. Performance & Fallbacks (MEDIUM)

- [`perf-compositor`](references/perf-compositor.md) — Performance advantages and fallback strategies

## Property Cheat Sheet

| Property | Description |
|----------|-------------|
| `animation-timeline` | Links an animation to a `scroll()` or `view()` timeline |
| `animation-range` | Shorthand for `animation-range-start` and `animation-range-end` |
| `scroll-timeline` | Defines a named scroll timeline on a container |
| `view-timeline` | Defines a named view timeline on a subject |
| `timeline-scope` | Increases the visibility of a named timeline to distant nodes |

## `scroll()` Function

```css
animation-timeline: scroll(<axis> <scroller>);
```

| Parameter | Values | Default |
|-----------|--------|---------|
| `axis` | `block`, `inline`, `x`, `y` | `block` |
| `scroller` | `nearest`, `root`, `self` | `nearest` |

## `view()` Function

```css
animation-timeline: view(<axis> <inset>);
```

| Parameter | Values | Default |
|-----------|--------|---------|
| `axis` | `block`, `inline`, `x`, `y` | `block` |
| `inset` | length or percentage | `auto` |

## Timeline Range Keywords

| Keyword | Meaning |
|---------|---------|
| `cover` | Full range — element entering to fully leaving (0% → 100%) |
| `entry` | Element starts entering → fully inside the scrollport |
| `exit` | Element starts leaving → fully gone from scrollport |
| `contain` | Element fully inside → starts to leave |
| `entry-crossing` | Element crosses the entry edge |
| `exit-crossing` | Element crosses the exit edge |

## Key Principles

1. **Always prefer `scroll()` / `view()` over JS scroll listeners** — runs on the compositor, zero main-thread cost
2. **Always use `animation-range`** to fine-tune when the animation plays — avoid animating across the full scroll distance
3. **Animate only `transform` and `opacity`** — compositor-friendly properties for maximum performance
4. **Use named timelines** when the animated element is not a descendant of the scroller
5. **Provide `@supports` fallbacks** for browsers that don't support `animation-timeline`
