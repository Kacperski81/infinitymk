# timeline-scroll — Scroll Progress Timeline

## Rule

Use `animation-timeline: scroll()` to link an animation to the scroll position of a container. The animation progresses from 0% to 100% as the user scrolls from top to bottom.

## Why

- Runs entirely on the compositor thread — no JavaScript, no jank
- Replaces `scroll` event listeners and `requestAnimationFrame` loops
- Zero main-thread cost regardless of animation complexity

## Syntax

```css
animation-timeline: scroll(<axis> <scroller>);
```

### Parameters

| Parameter | Values | Default | Description |
|-----------|--------|---------|-------------|
| `axis` | `block`, `inline`, `x`, `y` | `block` | Which scroll axis drives the animation |
| `scroller` | `nearest`, `root`, `self` | `nearest` | Which scrolling ancestor to track |

## Examples

### Basic — Track page scroll

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  transform-origin: left;
  animation: grow-progress linear both;
  animation-timeline: scroll(block root);
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

### Track a specific container

```css
.scrollable-container {
  overflow-y: auto;
  height: 400px;
}

.indicator {
  animation: fill-bar linear both;
  animation-timeline: scroll(block nearest);
}
```

### Horizontal scroll tracking

```css
.horizontal-gallery {
  overflow-x: auto;
  display: flex;
}

.horizontal-progress {
  animation: grow-progress linear both;
  animation-timeline: scroll(inline nearest);
}
```

## Anti-patterns

```css
/* ❌ BAD — Using JS scroll events */
window.addEventListener('scroll', () => {
  const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  bar.style.transform = `scaleX(${progress})`;
});

/* ✅ GOOD — Pure CSS scroll timeline */
.bar {
  animation: grow-progress linear both;
  animation-timeline: scroll(block root);
}
```
