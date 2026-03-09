# Browser Support & Fallbacks: IE11 Fallback Strategies

## Principle
Internet Explorer 11 doesn't support `transform-style: preserve-3d` for nested elements. Plan meaningful fallbacks: 2D layouts, scroll-based navigation, simplified effects, or progressive enhancement.

## Main Fallback Options
```css
/* Option 1: 2D carousel instead of 3D */
@supports (transform-style: preserve-3d) {
  /* Modern browsers: 3D carousel */
  .carousel-track {
    transform-style: preserve-3d;
    transform: rotateY(var(--angle));
  }
}

@supports not (transform-style: preserve-3d) {
  /* IE11: 2D scroll carousel */
  .carousel-track {
    display: flex;
    transform: translateX(var(--position));
    transition: transform 0.6s ease;
  }
}

/* Option 2: Simplify to non-nested 3D */
.single-element-3d {
  perspective: 1000px;
  transform: rotateY(45deg);  /* works in IE11 */
}

/* Option 3: Use scroll-based layout */
.carousel-modern {
  perspective: 1000px;
}

.carousel-legacy {
  overflow-x: auto;
  scroll-behavior: smooth;
}
```

## Common Fallback Patterns
```css
/* Card flip: works in IE11 on single elements */
.card {
  perspective: 1000px;
  transition: transform 0.6s;
}

.card:hover {
  transform: rotateY(180deg);  /* works in IE11 */
  backface-visibility: hidden;
}

/* 3D Carousel: fallback to scroll */
.carousel {
  perspective: 1000px;
}

.carousel-track {
  transform-style: preserve-3d;
  transform: rotateY(var(--angle));
}

/* IE11 fallback */
@supports not (transform-style: preserve-3d) {
  .carousel {
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  
  .carousel-track {
    display: flex;
    transform: none;
  }
  
  .carousel-item {
    flex: 0 0 100%;  /* full width items */
    scroll-snap-align: start;
  }
}
```

## Testing for IE11 Support
```javascript
// Feature detection
const supportsPreserve3D = () => {
  return CSS.supports('transform-style', 'preserve-3d');
};

// Usage
if (!supportsPreserve3D()) {
  // Apply IE11 fallback
  document.documentElement.classList.add('no-preserve-3d');
}
```

## CSS Classes Approach
```css
/* Modern browsers (default) */
.carousel-track {
  transform-style: preserve-3d;
  transform: rotateY(var(--angle));
}

/* IE11 detected */
.no-preserve-3d .carousel-track {
  overflow-x: auto;
  transform: none;
}

.no-preserve-3d .carousel-item {
  display: inline-block;
  scroll-snap-align: start;
}
```

## Graceful Degradation
```html
<!-- Provide both experiences -->
<div class="carousel">
  <!-- Modern 3D approach works automatically -->
  <div class="carousel-track">
    <div class="carousel-item">Item 1</div>
    <div class="carousel-item">Item 2</div>
  </div>
  
  <!-- IE11 sees scroll-based fallback automatically -->
</div>
```

```css
.carousel-track {
  /* Modern: 3D carousel */
  perspective: 1000px;
  transform-style: preserve-3d;
  transform: rotateY(var(--angle));
  
  /* IE11: becomes scrollable */
  overflow-x: auto;
  scroll-behavior: smooth;
}

.carousel-item {
  /* Modern: positioned in 3D */
  position: absolute;
  transform: rotateY(var(--angle)) translateZ(250px);
  
  /* IE11: inline flex items */
  display: inline-block;
  width: 100vw;
  flex-shrink: 0;
}
```

## Reality Check
- **IE11 market share**: < 1% in 2024
- **Institutional support**: Some enterprise customers still require it
- **Mobile**: IE11 not available on mobile
- **Plan accordingly**: Use graceful degradation if needed

## Recommended Approach
```css
/* Start with modern approach */
.enhanced-ui {
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* No IE11-specific CSS needed if fallback is acceptable */
/* Users on IE11 see simpler version automatically */
```

## Related Rules
- [`render-ie11-limitation`](render-ie11-limitation.md)
- [`support-modern-browsers`](support-modern-browsers.md)
- [`support-feature-detection`](support-feature-detection.md)
