# pattern-header-hide — Hide/Show Header on Scroll Direction

## Pattern

Hide the header when scrolling down, show when scrolling up — using scroll timelines and CSS techniques.

## Implementation

### Using scroll-driven animation + sticky behavior

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  animation: header-slide linear both;
  animation-timeline: scroll(block root);
  animation-range: 0px 300px;
}

@keyframes header-slide {
  from {
    transform: translateY(0);
    backdrop-filter: blur(0);
    background-color: transparent;
  }
  to {
    transform: translateY(0);
    backdrop-filter: blur(12px);
    background-color: rgba(0, 0, 0, 0.8);
  }
}
```

### Advanced — Direction detection with CSS custom properties

This technique uses long `transition-delay` values to "lock" a state until the opposite direction is detected.

```css
@property --scroll-position {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.header-wrapper .header {
  animation: track-scroll linear both;
  animation-timeline: scroll(block root);
}

@keyframes track-scroll {
  from { --scroll-position: 0; }
  to { --scroll-position: 1; }
}
```

### Simple — Opacity fade on scroll

```css
.header {
  position: fixed;
  top: 0;
  width: 100%;
  animation: header-bg linear both;
  animation-timeline: scroll(block root);
  animation-range: 0px 200px;
}

@keyframes header-bg {
  from {
    background-color: transparent;
    box-shadow: none;
  }
  to {
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
  }
}
```

## Notes

- True direction detection in pure CSS is still experimental
- For reliable scroll-direction-based hiding, consider a minimal JS fallback
- The opacity/background change pattern works very well with `animation-range` alone
