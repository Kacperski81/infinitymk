# perf-compositor — Performance Advantages & Fallbacks

## Rule

Scroll-driven animations run on the compositor thread by default when animating `transform` and `opacity`, making them inherently more performant than JavaScript-based alternatives. Always provide `@supports` fallbacks.

## Why Compositor-Only Matters

| Approach | Thread | Layout | Paint | Composite |
|----------|--------|--------|-------|-----------|
| CSS `scroll()` + `transform` | Compositor | No | No | Yes |
| CSS `scroll()` + `width` | Main | Yes | Yes | Yes |
| JS `scroll` event + style | Main | Yes | Yes | Yes |
| `IntersectionObserver` + class | Main | Depends | Depends | Depends |
| `requestAnimationFrame` loop | Main | Depends | Depends | Depends |

## Performance Rules

1. **Only animate `transform` and `opacity`** with scroll timelines for maximum perf
2. **Avoid animating `background-position`** — triggers paint every frame
3. **Avoid animating layout properties** (`width`, `height`, `margin`, `padding`, `top`, `left`)
4. **Avoid animating CSS custom properties** that cascade to many children
5. **Use `contain: layout` or `contain: paint`** on scroll-animated containers when possible

## Browser Support & Fallbacks

### Feature detection

```css
/* Scroll-driven animations supported */
@supports (animation-timeline: scroll()) {
  .parallax-bg {
    animation: parallax-shift linear both;
    animation-timeline: scroll(block root);
  }
}
```

### Progressive enhancement pattern

```css
/* Base — always visible, no animation */
.reveal-element {
  opacity: 1;
  transform: none;
}

/* Enhancement — scroll-driven reveal */
@supports (animation-timeline: view()) {
  .reveal-element {
    animation: fade-slide-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }

  @keyframes fade-slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

### Fallback with IntersectionObserver (when JS is acceptable)

```css
/* CSS fallback state */
.reveal-element:not(.is-visible) {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.reveal-element.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// Only used when @supports (animation-timeline: view()) is false
if (!CSS.supports('animation-timeline', 'view()')) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '-100px 0px', threshold: 0 }
  );

  document.querySelectorAll('.reveal-element').forEach((el) => observer.observe(el));
}
```

## Current Browser Support (2026)

- Chrome/Edge 115+: Full support
- Firefox 110+: Full support (with flags → stable in ~128)
- Safari 18+: Full support
- Always use `@supports` for progressive enhancement
