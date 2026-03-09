# timeline-view — View Progress Timeline

## Rule

Use `animation-timeline: view()` to animate an element as it enters and exits the scrollport (visible area). The animation progresses based on the element's visibility within its scrolling ancestor.

## Why

- No `IntersectionObserver` or JavaScript needed
- Automatically handles enter and exit animations
- Runs on the compositor — smooth even during heavy page rendering

## Syntax

```css
animation-timeline: view(<axis> <inset>);
```

### Parameters

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `axis` | `block`, `inline`, `x`, `y` | `block` | Which axis to track visibility on |
| `inset` | length or percentage | `auto` | Shrinks the scrollport for triggering |

## Examples

### Basic — Fade in on scroll

```css
.revealing-element {
  animation: fade-in linear both;
  animation-timeline: view();
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Fade and slide up

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

### With inset — Trigger earlier/later

```css
/* Element starts animating 100px before entering the viewport */
.early-reveal {
  animation: fade-in linear both;
  animation-timeline: view(block 100px);
}

/* Element starts animating when 20% inside the viewport */
.delayed-reveal {
  animation: fade-in linear both;
  animation-timeline: view(block 20%);
}
```

## Anti-patterns

```css
/* ❌ BAD — IntersectionObserver + class toggle */
observer.observe(el);
// on intersect: el.classList.add('visible');

/* ❌ BAD — Scroll event + getBoundingClientRect */
window.addEventListener('scroll', () => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) { ... }
});

/* ✅ GOOD — Pure CSS view timeline */
.element {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 40%;
}
```
