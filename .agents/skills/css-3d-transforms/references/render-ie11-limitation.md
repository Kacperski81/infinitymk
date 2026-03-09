# Browser Support & Fallbacks: IE11 Doesn't Support Preserve-3D for Nested Elements

## Principle
Internet Explorer 11 does not support `transform-style: preserve-3d` for nested 3D elements. This means IE11 can use 3D transforms on individual elements but cannot construct complex 3D objects with properly nested children.

## Application
```css
/* Works in IE11 */
.single-element {
  perspective: 1000px;
  transform: rotateY(45deg);
}

/* Does NOT work in IE11 */
.carousel {
  perspective: 1000px;
  transform-style: preserve-3d;  /* ignored in IE11 */
}

.carousel-item {
  transform: rotateY(var(--angle)) translateZ(250px);  /* flattened in IE11 */
}

/* Fallback for IE11 */
@supports (transform-style: preserve-3d) {
  /* Modern browsers: full 3D */
  .carousel {
    transform-style: preserve-3d;
  }
}

@supports not (transform-style: preserve-3d) {
  /* IE11 fallback: 2D layout or simple animations */
  .carousel {
    overflow-x: auto;
  }
}
```

## Key Guidelines
- **IE11 limitation**: No `preserve-3d` support for nesting
- **Workaround needed**: Provide 2D fallback or feature detection
- **Individual 3D**: Single elements can still use rotateY, rotateX
- **No nested geometry**: Cubes, complex carousels won't work
- **Feature detect**: Use `@supports (transform-style: preserve-3d)`

## Visual Impact
- IE11 sees flattened 3D structures
- Carousel items don't appear at correct depth
- Cube faces collapse into single plane
- Card flips still work for individual elements

## Why It Matters
IE11 market share is minimal (< 1%), but institutional deployments require support. Plan graceful degradation.

## Common Fallback Patterns
```css
/* Carousel: 3D for modern, 2D scroll for IE11 */
.carousel {
  perspective: 1000px;
}

.carousel-track {
  transform-style: preserve-3d;
  transform: rotateY(var(--angle));
  transition: transform 0.6s;
}

/* IE11 fallback */
@supports not (transform-style: preserve-3d) {
  .carousel-track {
    transform: none;
    overflow-x: auto;
    scroll-behavior: smooth;
  }
  
  .carousel-item {
    display: inline-block;
  }
}

/* Card flip: works in IE11 with limitations */
.card-flip {
  perspective: 1000px;
}

/* Simple element works in IE11 */
.single-flip {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
```

## Feature Detection
```css
/* Use @supports for feature detection */
@supports (transform-style: preserve-3d) {
  .element { transform-style: preserve-3d; }
}

@supports not (transform-style: preserve-3d) {
  /* Fallback: 2D transforms, animations, or alternative layout */
}
```

## JavaScript Detection
```javascript
// Detect preserve-3d support
const supportPreserve3D = CSS.supports('transform-style', 'preserve-3d');

if (supportPreserve3D) {
  // Use 3D transforms
} else {
  // Use fallback (2D, scroll, etc.)
}
```

## Related Rules
- [`support-ie11-fallback`](support-ie11-fallback.md)
- [`nesting-preserve-3d`](nesting-preserve-3d.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
