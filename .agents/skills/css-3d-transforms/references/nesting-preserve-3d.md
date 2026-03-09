# Transform Origin & Nesting: Preserve 3D for Nested Elements

## Principle
`transform-style: preserve-3d` enables child elements to live in their parent's 3D space. Without it, 3D transforms on nested elements are flattened to the plane, breaking 3D composition.

## Application
```css
/* Parent with preserve-3d */
.scene {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.scene > .child {
  transform: rotateY(45deg) translateZ(100px);
}

/* Without preserve-3d, children flatten */
.flat-parent {
  transform: rotateY(45deg);
  /* Children are flat; nested 3D breaks */
}

.flat-parent .child {
  transform: rotateY(90deg);  /* appears as 2D, not 3D */
}
```

## Key Guidelines
- **Syntax**: `transform-style: preserve-3d;`
- **Parent property**: Applied to element that contains 3D children
- **Default**: `flat` (children rendered in element's plane)
- **preserve-3d**: Children positioned in 3D space relative to parent
- **Required for**: Cubes, boxes, complex 3D scenes
- **Cascades**: Each element can have preserve-3d

## Visual Mental Model
- Without: All children rendered on parent's flat surface
- With: Children extend in 3D space relative to parent
- Imagine: Window into 3D space vs. all elements stuck to paper

## Why It Matters
Preserve-3d is essential for any 3D structure: cubes, carousels with proper perspective, boxes. Without it, nested 3D breaks.

## Common Patterns
```css
/* 3D carousel (requires preserve-3d) */
.carousel {
  perspective: 1000px;
}

.carousel-track {
  transform-style: preserve-3d;
  transform: rotateY(var(--angle));
}

.carousel-item {
  position: absolute;
  transform: rotateY(calc(var(--index) * 90deg)) translateZ(250px);
}

/* 3D cube (requires preserve-3d) */
.cube {
  perspective: 1000px;
}

.cube-container {
  transform-style: preserve-3d;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  width: 200px;
  height: 200px;
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
}

.front { transform: translateZ(100px); }
.back { transform: rotateY(180deg) translateZ(100px); }
.left { transform: rotateY(-90deg) translateZ(100px); }
.right { transform: rotateY(90deg) translateZ(100px); }
```

## Inheritance
- `preserve-3d` doesn't inherit
- Each parent that has 3D children needs its own `preserve-3d`
- Stacking multiple levels: each level needs declaration

## Browser Support
- ✅ All modern browsers
- ❌ IE11: Does NOT support `preserve-3d` for nested elements

## Related Rules
- [`render-preserve-3d-required`](render-preserve-3d-required.md)
- [`render-ie11-limitation`](render-ie11-limitation.md)
- [`pattern-cube`](pattern-cube.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
