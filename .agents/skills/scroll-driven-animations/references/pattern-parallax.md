# pattern-parallax — Parallax with Scroll Timelines

## Pattern

Create parallax depth effects where background layers move at different speeds relative to the scroll position — purely in CSS.

## Implementation

### Basic parallax background

```css
.parallax-layer {
  animation: parallax-shift linear both;
  animation-timeline: scroll(block root);
}

@keyframes parallax-shift {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}
```

### Multi-layer parallax

```css
.parallax-bg {
  animation: parallax-slow linear both;
  animation-timeline: scroll(block root);
}

.parallax-mid {
  animation: parallax-medium linear both;
  animation-timeline: scroll(block root);
}

.parallax-fg {
  /* Foreground scrolls normally — no animation needed */
}

@keyframes parallax-slow {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

@keyframes parallax-medium {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}
```

### Parallax with view timeline (element-scoped)

```css
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-background {
  animation: hero-parallax linear both;
  animation-timeline: view();
  animation-range: cover 0% cover 100%;
}

@keyframes hero-parallax {
  from { transform: translateY(-50px); }
  to { transform: translateY(50px); }
}
```

## Performance Notes

- Only use `transform` for parallax — never `background-position` or `top`/`left`
- Use `will-change: transform` on parallax layers sparingly
- Avoid parallax on very large images without containment

## Anti-patterns

```css
/* ❌ BAD — JS-driven parallax */
window.addEventListener('scroll', () => {
  el.style.transform = `translateY(${scrollY * 0.35}px)`;
});

/* ❌ BAD — Animating background-position (triggers paint) */
@keyframes bad-parallax {
  from { background-position: center 0; }
  to { background-position: center -200px; }
}

/* ✅ GOOD — Transform-only parallax */
@keyframes good-parallax {
  from { transform: translateY(0); }
  to { transform: translateY(-200px); }
}
```
