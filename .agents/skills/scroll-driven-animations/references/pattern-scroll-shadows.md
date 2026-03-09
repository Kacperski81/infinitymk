# pattern-scroll-shadows — Scroll Shadows

## Pattern

Show shadows at the top/bottom (or left/right) of a scrollable container only when there is more content to scroll in that direction.

## Implementation

### Classic background-attachment technique

```css
.scroll-container {
  overflow-y: auto;
  max-height: 300px;

  background:
    /* Shadow cover — scrolls with content (hides shadow) */
    linear-gradient(white 30%, transparent) center top,
    linear-gradient(transparent, white 70%) center bottom,

    /* Shadow — fixed behind content */
    radial-gradient(farthest-side at 50% 0, rgba(0,0,0,0.15), transparent) center top,
    radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,0.15), transparent) center bottom;

  background-repeat: no-repeat;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;
}
```

### Enhanced with scroll timeline

```css
.scroll-container {
  overflow-y: auto;
  position: relative;
}

.scroll-container::before,
.scroll-container::after {
  content: '';
  position: sticky;
  left: 0;
  width: 100%;
  height: 20px;
  pointer-events: none;
  z-index: 1;
}

.scroll-container::before {
  top: 0;
  background: linear-gradient(rgba(0,0,0,0.12), transparent);
  animation: shadow-top linear both;
  animation-timeline: scroll(self);
  animation-range: 0% 5%;
}

.scroll-container::after {
  bottom: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.12));
  animation: shadow-bottom linear both;
  animation-timeline: scroll(self);
  animation-range: 95% 100%;
}

@keyframes shadow-top {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shadow-bottom {
  from { opacity: 1; }
  to { opacity: 0; }
}
```

## Dark Theme Variant

```css
.dark .scroll-container {
  background:
    linear-gradient(#0a0a0a 30%, transparent) center top,
    linear-gradient(transparent, #0a0a0a 70%) center bottom,
    radial-gradient(farthest-side at 50% 0, rgba(255,255,255,0.08), transparent) center top,
    radial-gradient(farthest-side at 50% 100%, rgba(255,255,255,0.08), transparent) center bottom;
  background-repeat: no-repeat;
  background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
  background-attachment: local, local, scroll, scroll;
}
```
