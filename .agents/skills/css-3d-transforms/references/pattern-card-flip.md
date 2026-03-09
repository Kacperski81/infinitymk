# Practical 3D Patterns: Card Flip Transitions

## Principle
Card flips combine `rotateY()`, `perspective`, `backface-visibility: hidden`, and `transform-style: preserve-3d` to create convincing 3D flipping effects. Two card faces (front and back) are stacked, with only the front-facing card visible at any time.

## Application
```css
/* Container with perspective */
.flip-card {
  perspective: 1000px;
  position: relative;
  width: 200px;
  height: 300px;
}

/* Inner container for smooth animation */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Individual card faces */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Back face is rotated 180° and hidden until flipped */
.flip-card-back {
  transform: rotateY(180deg);
  background-color: #f1f1f1;
}

/* Trigger flip on hover */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
```

## HTML Structure
```html
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <h2>Front Card</h2>
    </div>
    <div class="flip-card-back">
      <h2>Back Card</h2>
    </div>
  </div>
</div>
```

## Key Components
- **`perspective`**: Enables 3D space (1000px typical)
- **`transform-style: preserve-3d`**: Keeps both faces in 3D space
- **`backface-visibility: hidden`**: Hides non-visible face
- **`rotateY(180deg)`**: Back face 180° rotation
- **Transition**: Smooths the flip animation

## Variations
```css
/* Vertical flip (rotateX) */
.flip-vertical .flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-vertical:hover .flip-card-inner {
  transform: rotateX(180deg);
}

.flip-vertical .flip-card-back {
  transform: rotateX(180deg);
}

/* Faster flip */
.flip-fast .flip-card-inner {
  transition: transform 0.3s;
}

/* Staggered card flips */
.flip-card {
  transition-delay: calc(var(--index) * 0.1s);
}
```

## Why It Works
The card flip leverages human spatial intuition. The visible face rotates away while the hidden back face rotates into view, creating a convincing 3D effect.

## Common Use Cases
- Portfolio project cards
- Product feature reveals
- Team member profile cards
- Before/after comparisons
- Quiz flashcards

## Performance Considerations
- Use `will-change: transform` for animated flips
- Single transition on inner container (efficient)
- `backface-visibility` is lightweight
- Keep perspective realistic (800-1200px)

## Accessibility
```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .flip-card-inner {
    transition: none;
  }
  
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);  /* instant flip */
  }
}
```

## Related Rules
- [`render-backface-hidden`](render-backface-hidden.md)
- [`pattern-flip-animation`](pattern-flip-animation.md)
- [`perspective-define`](perspective-define.md)
