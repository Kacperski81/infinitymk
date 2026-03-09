# Perspective Foundation: Apply Perspective to Container

## Principle
Perspective is most effective when applied to the **parent container** rather than individual elements. This creates a unified 3D space in which all children share the same vanishing point, making their spatial relationships coherent.

## Application
```css
/* Correct: perspective on parent */
.carousel {
  perspective: 1000px;
}

.carousel-item {
  transform: rotateY(45deg) translateZ(200px);
}

/* Incorrect: perspective on individual items */
/* Creates separate vanishing points for each */
.carousel-item {
  perspective: 1000px;
  transform: rotateY(45deg);
}
```

## Key Guidelines
- **Always** place perspective on the container, not individual elements
- Children inherit the vanishing point, creating shared 3D space
- If perspective is on each child, each one gets its own vanishing point (usually unwanted)
- Height/width of perspective container affects effective depth
- Use reasonable container sizes; very small containers distort perspective

## Why It Matters
When every element has its own perspective, the 3D scene breaks into disconnected spatial realities. A single parent perspective creates the illusion of a unified 3D environment.

## Common Pattern
```css
.scene {
  perspective: 1000px;
}

.scene > * {
  transform: /* 3D transforms here */;
}
```

## Related Rules
- [`perspective-define`](perspective-define.md)
- [`nesting-preserve-3d`](nesting-preserve-3d.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
