# Transform Origin & Nesting: 3D Z-Offset in Transform Origin

## Principle
`transform-origin` accepts a third Z value to define the rotation point's depth in 3D space. This enables rotating around points that aren't in the element's plane—useful for advanced 3D effects.

## Application
```css
/* Origin at center X, center Y, 100px behind element */
.element {
  transform-origin: 50% 50% -100px;
  transform: rotateX(45deg);
}

/* Origin forward in Z-space */
.element {
  transform-origin: 50% 50% 100px;
  transform: rotateY(45deg);
}

/* Corner hinge with Z depth */
.box {
  transform-origin: 100% 100% 50px;
  transform: rotateX(-45deg) rotateY(45deg);
}
```

## Key Guidelines
- **Third value**: Z-offset in pixels or other length units
- **Positive**: Origin point moves forward (toward viewer)
- **Negative**: Origin point moves backward (away from viewer)
- **Default**: 0 (origin at element's Z-plane)
- **Rarely needed**: Most interfaces use 2D origin values
- **Useful for**: Complex nested 3D structures, advanced effects

## Visual Mental Model
- Imagine **moving the rotation pin in 3D space**
- Negative Z pushes the pin backward behind the element
- Positive Z pulls the pin forward in front
- Rotation sweeps around this 3D point

## Why It Matters
Z-offset in transform-origin enables unique spatial effects: off-plane rotation pivots, 3D object assembly with non-planar rotation points, and advanced animation choreography.

## Common Scenarios
```css
/* Rotate around back surface (create convex effect) */
.element {
  transform-origin: 50% 50% -100px;
  transform: rotateX(45deg);
}

/* 3D object hinge at internal point */
.door-3d {
  transform-origin: 100% 50% 50px;
  transform: rotateY(-90deg);
}

/* Complex nested animation */
.nested {
  transform-origin: 50% 50% -200px;
  transform: rotateX(var(--angle));
}
```

## Effect on Rotation
- Rotation occurs around the 3D point defined by (X%, Y%, Z)
- Children follow the rotation arc centered on that point
- Z-value changes effective pivot distance

## Performance Note
- Z-offset adds minimal computational cost
- Most modern CSS parsing handles it efficiently
- Useful only when non-zero value needed

## Related Rules
- [`origin-default-center`](origin-default-center.md)
- [`origin-set-explicitly`](origin-set-explicitly.md)
- [`pattern-cube`](pattern-cube.md)
