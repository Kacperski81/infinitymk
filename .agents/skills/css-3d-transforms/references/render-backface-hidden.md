# Preserve 3D & Rendering: Hide Back Faces

## Principle
`backface-visibility: hidden` hides an element when its back face is toward the viewer. This is essential for card flips and 3D objects where the back shouldn't be visible when facing away.

## Application
```css
/* Card flip: hide back when rotated */
.card {
  perspective: 1000px;
}

.card-front,
.card-back {
  backface-visibility: hidden;
  position: absolute;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

/* Cube face */
.cube-face {
  backface-visibility: hidden;
}
```

## Key Guidelines
- **Syntax**: `backface-visibility: hidden;` or `visible` (default)
- **Default**: `visible` (back face shows when rotated away)
- **Hidden**: Element disappears when back face toward viewer
- **Use with**: Card flips, dual-face objects, 3D reveals
- **Paired**: Often used on both front and back faces of flipped cards

## Visual Mental Model
- Think: "Is the back of this card facing me?"
- If yes and `hidden`: Card disappears (shows what's behind)
- If yes and `visible`: Card shows with back face content
- Useful for: Flip transitions, 3D cube faces

## Why It Matters
`backface-visibility: hidden` enables card flips that reveal an alternate face. Without it, the back face shows mirror-reversed content when rotated away.

## Common Patterns
```css
/* Perfect card flip */
.flip-card {
  perspective: 1000px;
  position: relative;
  width: 200px;
  height: 300px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* 3D cube (all faces hidden until facing forward) */
.cube-face {
  backface-visibility: hidden;
  position: absolute;
}
```

## Performance Note
- Lightweight rendering feature
- No layout impact; purely visual
- Enables crisp card flip effects

## Related Rules
- [`render-preserve-3d-required`](render-preserve-3d-required.md)
- [`pattern-card-flip`](pattern-card-flip.md)
- [`pattern-flip-animation`](pattern-flip-animation.md)
