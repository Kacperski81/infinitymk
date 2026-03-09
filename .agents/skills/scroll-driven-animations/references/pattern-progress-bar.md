# pattern-progress-bar — Scroll Progress Bar

## Pattern

A reading progress indicator fixed to the top of the page, driven entirely by CSS.

## Implementation

```css
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent-color, #22d3ee);
  transform-origin: left;
  z-index: 9999;

  animation: grow-progress linear both;
  animation-timeline: scroll(block root);
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

```html
<div class="progress-bar" aria-hidden="true"></div>
```

## Why `scaleX` Over `width`

- `transform: scaleX()` runs on the compositor — zero layout cost
- `width` triggers layout recalculation every frame — causes jank
- Always use `transform-origin: left` to scale from the correct edge

## Variations

### With color transition

```css
@keyframes grow-progress-color {
  from {
    transform: scaleX(0);
    background-color: #ef4444;
  }
  50% {
    background-color: #eab308;
  }
  to {
    transform: scaleX(1);
    background-color: #22c55e;
  }
}
```

### Container-scoped progress

```css
.article-wrapper {
  overflow-y: auto;
  max-height: 80vh;
}

.article-progress {
  animation: grow-progress linear both;
  animation-timeline: scroll(block nearest);
}
```
