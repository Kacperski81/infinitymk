# Transform Origin & Nesting: Default Transform Origin

## Principle
The `transform-origin` property defines the point around which transforms occur. In 3D, the default is the element's center: 50% 50% 0 (center X, center Y, Z-plane).

## Application
```css
.element {
  transform: rotateY(45deg);
  /* Implicit: transform-origin: 50% 50% 0; */
}

.element.custom {
  transform-origin: 50% 50% 0;  /* Explicit (redundant) */
  transform: rotateY(45deg);
}
```

## Key Guidelines
- **Default**: 50% 50% 0 (center horizontally, vertically, at Z-plane)
- **Two values**: X-offset, Y-offset; Z defaults to 0
- **Three values**: X, Y, Z offsets in 3D space
- **Units**: Percentages, pixels, keywords (left, right, top, bottom, center)
- **Affects**: Point around which all transforms rotate, scale, or translate

## Visual Mental Model
- Imagine **a pin through the element's center**
- Rotations spin around that pin
- Moving the pin changes the rotation point
- In 3D, the pin can be deep in Z-space

## Why It Matters
Default center-origin works for 90% of interfaces. But off-center origins enable effects like corner rotations, edge-hinged flips, and corner-perspective cubes.

## Common Scenarios
```css
/* Center rotation (default) */
.element {
  transform: rotateY(45deg);
}

/* Top-left corner rotation */
.element {
  transform-origin: 0% 0%;
  transform: rotateY(45deg);
}

/* Hinge effect (right edge) */
.door {
  transform-origin: 100% 0%;
  transform: rotateY(-90deg);
}
```

## Related Rules
- [`origin-set-explicitly`](origin-set-explicitly.md)
- [`origin-3d-value`](origin-3d-value.md)
- [`pattern-card-flip`](pattern-card-flip.md)
