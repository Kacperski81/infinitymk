# 3D Transform Functions: Rotate Around X Axis

## Principle
`rotateX()` rotates an element around the horizontal axis (left-right). Positive angles rotate the top toward the viewer; negative angles rotate it away.

## Application
```css
.element {
  transform: rotateX(45deg);
}

.card-front {
  transform: rotateX(0deg);
}

.card-back {
  transform: rotateX(180deg);
  backface-visibility: hidden;
}
```

## Key Guidelines
- **Syntax**: `rotateX(angle)` where angle is deg, grad, rad, or turn
- **Positive**: Top rotates toward viewer (pitches down)
- **Negative**: Top rotates away (pitches up)
- **0deg**: No rotation (element faces viewer)
- **90deg**: Edge-on to viewer (invisible)
- **180deg**: Back face toward viewer
- Requires `perspective` on parent for effect

## Visual Mental Model
- Imagine a hinge on the **left-right axis** (like opening a book forward/backward)
- Positive rotation: top comes toward you, bottom goes away
- Common for card flips (front=0deg, back=180deg)

## Why It Matters
`rotateX()` creates the "card pitch" effect—most intuitive for vertical card flips and perspective reveals. Combined with perspective, it adds depth to UI patterns.

## Common Patterns
```css
/* Tilt effect on hover */
.element:hover {
  transform: perspective(1000px) rotateX(-10deg);
}

/* Back-face card flip */
.card.flipped .face-back {
  transform: rotateX(180deg);
}
```

## Units
- `deg`: Degrees (0-360)
- `turn`: Full rotations (0.5turn = 180deg)
- `rad`: Radians (Math.PI ≈ 180deg)

## Related Rules
- [`function-rotateY`](function-rotateY.md)
- [`render-backface-hidden`](render-backface-hidden.md)
- [`pattern-card-flip`](pattern-card-flip.md)
