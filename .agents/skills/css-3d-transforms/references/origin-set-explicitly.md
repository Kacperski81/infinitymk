# Transform Origin & Nesting: Set Transform Origin Explicitly

## Principle
Use `transform-origin` to change the rotation point of transforms. Non-center origins create compelling effects: off-axis rotations, corner hinges, edge pivots, and corner-based perspective transforms.

## Application
```css
/* Corner rotation */
.element {
  transform-origin: 0% 0%;  /* top-left */
  transform: rotateZ(45deg);
}

/* Edge hinge (like a door) */
.door {
  transform-origin: 100% 50%;  /* right edge */
  transform: rotateY(-90deg);
}

/* Custom pixel values */
.custom {
  transform-origin: 100px 50px;  /* rotate around pixel position */
  transform: rotateY(45deg);
}
```

## Key Guidelines
- **Syntax**: `transform-origin: X Y [Z]`
- **Percentages**: Relative to element dimensions (50% = center)
- **Pixels/em**: Absolute distance from top-left corner
- **Keywords**: `left`, `right`, `center` (X); `top`, `middle`, `bottom` (Y)
- **Z-value**: Rarely needed; puts origin point in 3D space
- **Affects**: All transforms on that element

## Common Values
- `50% 50%` - Center (default)
- `0% 0%` - Top-left corner
- `100% 100%` - Bottom-right corner
- `100% 50%` - Right edge middle
- `0% 50%` - Left edge middle
- `50% 0%` - Top edge middle

## Why It Matters
Custom origins unlock unique UI patterns: corner rotations, edge-hinged effects, and perspective arrangements that feel natural or metaphorical.

## Common Patterns
```css
/* Corner-flip card */
.card {
  transform-origin: 100% 0%;  /* top-right corner */
  transform: rotateZ(-30deg);
}

/* Ripple effect from center */
.ripple {
  transform-origin: center center;
  transform: scale(0);
  animation: ripple-expand 0.6s ease-out;
}

/* Hinge on right edge */
.menu {
  transform-origin: 100% 50%;
  transform: rotateY(0deg);
}

.menu.open {
  transform: rotateY(-90deg);
}
```

## Percentage vs Pixel Values
```css
/* Percentage: scales with element size */
.element {
  width: 200px;
  transform-origin: 50% 50%;  /* center regardless of size */
}

/* Pixels: fixed position */
.fixed-origin {
  transform-origin: 100px 100px;  /* always same pixel point */
}
```

## Related Rules
- [`origin-default-center`](origin-default-center.md)
- [`origin-3d-value`](origin-3d-value.md)
- [`transform-origin-aware`](transform-origin-aware.md)
