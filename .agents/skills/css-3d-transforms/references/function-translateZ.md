# 3D Transform Functions: Move Along Z Axis

## Principle
`translateZ()` moves an element closer to or farther from the viewer along the Z axis. Positive values bring elements forward; negative push them back. The visual effect is size change when combined with perspective.

## Application
```css
.element {
  transform: translateZ(100px);
}

/* Combined with perspective */
.scene {
  perspective: 1000px;
}

.near {
  transform: translateZ(200px);  /* appears larger */
}

.far {
  transform: translateZ(-200px);  /* appears smaller */
}
```

## Key Guidelines
- **Syntax**: `translateZ(distance)` in px, em, rem, or other length units
- **Positive**: Moves toward viewer (appears to scale up)
- **Negative**: Moves away from viewer (appears to scale down)
- **Requires perspective parent** or becomes invisible
- **0px**: No Z movement (stays in plane)
- Visual scaling follows: distance / (perspective - translateZ)

## Visual Mental Model
- Imagine **moving objects along a stick pointing at you**
- Move forward (positive) = object gets closer, looks bigger
- Move backward (negative) = object recedes, looks smaller
- Perspective determines scaling rate

## Why It Matters
`translateZ()` enables depth composition. Combined with `rotateY()` in carousels or cubes, it positions elements in believable 3D space. Without perspective, the effect is invisible.

## Common Patterns
```css
/* Layered depth effect */
.background {
  transform: translateZ(-300px);  /* 30% smaller */
}

.midground {
  transform: translateZ(0px);     /* normal size */
}

.foreground {
  transform: translateZ(300px);   /* 30% larger */
}

/* Carousel positioning */
.carousel-item {
  transform: rotateY(var(--angle)) translateZ(250px);
}
```

## Interaction with Perspective
- Effective size = "1 + (translateZ / perspective)"
- `translateZ(500px) perspective(1000px)` ≈ 1.5x normal size
- `translateZ(-500px) perspective(1000px)` ≈ 0.5x normal size
- Maximum depth: don't exceed perspective distance

## Related Rules
- [`perspective-define`](perspective-define.md)
- [`function-scaleZ`](function-scaleZ.md)
- [`origin-3d-value`](origin-3d-value.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
