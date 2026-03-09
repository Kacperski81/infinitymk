# Preserve 3D & Rendering: Preserve-3D Is Required for Child Visibility

## Principle
In 3D scenes, `transform-style: preserve-3d` on the parent is essential for child elements positioned with `translateZ()` to appear correctly. Without it, children flatten to the parent's plane and relative depth is lost.

## Application
```css
/* Correct: parent has preserve-3d */
.carousel {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.carousel-item {
  transform: rotateY(var(--angle)) translateZ(250px);
  /* Child appears at correct depth */
}

/* Incorrect: missing preserve-3d */
.flat-carousel {
  perspective: 1000px;
  /* No preserve-3d */
}

.flat-carousel-item {
  transform: rotateY(var(--angle)) translateZ(250px);
  /* Appears flattened; depth irrelevant */
}
```

## Key Guidelines
- **Parent requirement**: Parent with transformed children must have `preserve-3d`
- **Per level**: Each nested level needs its own `preserve-3d` if it has 3D children
- **No default**: `transform-style` defaults to `flat`
- **Cascade**: Not inherited; each parent needs declaration
- **With perspective**: Usually paired with `perspective` and children using `translateZ()`

## Visual Mental Model
- Without `preserve-3d`: Paper cutout children stuck to parent surface
- With `preserve-3d`: Window into 3D space; children float freely in depth
- Flattened children: Z-axis positioning ignored

## Why It Matters
`preserve-3d` is the foundation of 3D composition. Without it, elaborate 3D structures collapse into flat arrangements.

## Common Misunderstanding
```css
/* ❌ Doesn't work: children flatten */
.parent {
  perspective: 1000px;
  transform-style: flat;  /* or omitted (default) */
}

.child {
  transform: translateZ(100px);  /* ignored */
}

/* ✅ Correct: children appear at depth */
.parent {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.child {
  transform: translateZ(100px);  /* honored */
}
```

## Common Patterns
```css
/* Carousel with preserved depth */
.carousel-track {
  transform-style: preserve-3d;
  transform: rotateY(var(--rotation));
}

/* 3D stage for children */
.stage {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.stage-element {
  transform: translateZ(var(--depth));
}
```

## Debugging
- Use transform origin indicators and manual rotation to test
- Verify parent has `preserve-3d` if children don't appear at correct depth
- Check browser DevTools computed styles

## Related Rules
- [`nesting-preserve-3d`](nesting-preserve-3d.md)
- [`render-ie11-limitation`](render-ie11-limitation.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
