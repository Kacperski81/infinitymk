# Perspective Foundation: Perspective Property vs Function

## Principle
CSS offers two ways to apply perspective: the `perspective` property (on parent) and the `perspective()` function (in transform). They're different tools for different situations.

## Application
```css
/* Property: applies to children */
.parent {
  perspective: 1000px;
}

/* Function: applies to element itself */
.element {
  transform: perspective(1000px) rotateY(45deg);
}

/* Function in sequence */
.element {
  transform: perspective(1000px) rotateY(45deg) translateZ(100px);
}
```

## Key Guidelines
- **Property** (`perspective: 1000px`): Creates perspective for all children
- **Function** (`perspective(1000px) ...`): Applies perspective to single element's transforms
- Use **property** when multiple sibling elements share 3D space
- Use **function** when one element needs isolated perspective
- Function must come **first** in transform chain: `perspective(...) rotateX(...)`
- Both methods use same distance values (500-1500px typical)

## Why It Matters
The property creates a global 3D scene for siblings. The function creates local perspective for individual transforms. Using the wrong one creates spatial inconsistency or extra markup.

## Decision Tree
```
Multiple children in 3D space? → Use property on parent
Single element's custom perspective? → Use function in transform
Need to isolate one element's view? → Use function
Nested elements with different perspectives? → Use function on inner
```

## Common Pattern
```css
/* Carousel: property for shared space */
.carousel {
  perspective: 1000px;
}

/* Individual card with unique tilt: function */
.card.interactive {
  transform: perspective(200px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
}
```

## Related Rules
- [`perspective-define`](perspective-define.md)
- [`perspective-container`](perspective-container.md)
- [`function-rotateX`](function-rotateX.md)
