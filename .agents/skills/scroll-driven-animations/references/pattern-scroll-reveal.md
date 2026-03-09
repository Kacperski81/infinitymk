# pattern-scroll-reveal — Fade/Slide Elements on Scroll

## Pattern

Reveal elements as they enter the viewport using `animation-timeline: view()` — no JavaScript, no IntersectionObserver.

## Implementation

### Fade in

```css
.reveal-fade {
  animation: reveal-fade linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 40%;
}

@keyframes reveal-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Fade + slide up

```css
.reveal-up {
  animation: reveal-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Fade + slide from left

```css
.reveal-left {
  animation: reveal-left linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 35%;
}

@keyframes reveal-left {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Staggered children (using animation-delay or nth-child)

```css
.stagger-container > * {
  animation: reveal-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

.stagger-container > :nth-child(1) { animation-range: entry 0% entry 80%; }
.stagger-container > :nth-child(2) { animation-range: entry 10% entry 90%; }
.stagger-container > :nth-child(3) { animation-range: entry 20% entry 100%; }
```

## With `@supports` Fallback

```css
/* Fallback — elements are visible by default */
.reveal-up {
  opacity: 1;
  transform: translateY(0);
}

@supports (animation-timeline: view()) {
  .reveal-up {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }
}
```

## Anti-patterns

```css
/* ❌ BAD — JS-based reveal */
const observer = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) e.target.classList.add('visible');
});

/* ❌ BAD — Animating layout properties */
@keyframes bad-reveal {
  from { height: 0; margin-top: 40px; }
  to { height: auto; margin-top: 0; }
}

/* ✅ GOOD — Compositor-only properties */
@keyframes good-reveal {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```
