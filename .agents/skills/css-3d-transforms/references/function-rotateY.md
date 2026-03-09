# 3D Transform Functions: Rotate Around Y Axis

## Principle
`rotateY()` rotates an element around the vertical axis (up-down). Positive angles rotate the right side toward the viewer; negative angles rotate it away.

## Application
```css
.element {
  transform: rotateY(45deg);
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
```

## Key Guidelines
- **Syntax**: `rotateY(angle)` where angle is deg, grad, rad, or turn
- **Positive**: Right edge rotates toward viewer (yaws right)
- **Negative**: Right edge rotates away (yaws left)
- **0deg**: No rotation (element faces viewer)
- **90deg**: Edge-on to viewer (invisible)
- **180deg**: Back face toward viewer
- Requires `perspective` on parent for effect

## Visual Mental Model
- Imagine a hinge on the **top-bottom axis** (like a door rotating)
- Positive rotation: right comes toward you, left goes back
- Most common for horizontal card flips and carousel cycles

## Why It Matters
`rotateY()` is the primary function for lateral card flips and carousel effects. It's the most intuitive 3D rotation for web interfaces because it mirrors natural object rotation in space.

## Common Patterns
```css
/* Horizontal card flip */
.card.flipped .face-back {
  transform: rotateY(180deg);
}

/* Carousel item positioning */
.carousel-item:nth-child(1) {
  transform: rotateY(0deg) translateZ(200px);
}
.carousel-item:nth-child(2) {
  transform: rotateY(90deg) translateZ(200px);
}
.carousel-item:nth-child(3) {
  transform: rotateY(180deg) translateZ(200px);
}
```

## Units
- `deg`: Degrees (0-360)
- `turn`: Full rotations (0.25turn = 90deg)
- `rad`: Radians (Math.PI/2 ≈ 90deg)

## Related Rules
- [`function-rotateX`](function-rotateX.md)
- [`function-translateZ`](function-translateZ.md)
- [`render-backface-hidden`](render-backface-hidden.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
- [`pattern-cube`](pattern-cube.md)
