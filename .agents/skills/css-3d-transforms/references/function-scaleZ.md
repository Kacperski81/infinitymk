# 3D Transform Functions: Scale Along Z Axis

## Principle
`scaleZ()` stretches or compresses an element along the Z axis. It's primarily useful in combination with `translateZ()` and `translate3d()` to stretch elements in 3D space, though its visual effect is subtle without perspective children.

## Application
```css
.element {
  transform: scaleZ(1.5);
}

/* Combined with translateZ for depth */
.scene {
  perspective: 1000px;
}

.element {
  transform: translate3d(0, 0, 100px) scaleZ(2) rotateX(45deg);
}

/* Stretching 3D components */
.cube-face {
  width: 200px;
  height: 200px;
  transform: translateZ(100px) scaleZ(1);
}
```

## Key Guidelines
- **Syntax**: `scaleZ(number)` where 1 = no scale
- **Positive > 1**: Stretches along Z axis
- **Positive < 1**: Compresses along Z axis
- **Less intuitive** than `translateZ()` for most use cases
- **Affects child positioning**: Children placed with `translateZ()` are scaled
- **Use with caution**: Rarely needed unless building complex 3D geometry

## Visual Mental Model
- Imagine **stretching or squashing a spring** (compression along Z)
- `scaleZ(2)` doubles the Z-depth of children positioned with `translateZ()`
- Useful for adjusting proportions of 3D objects, not typical interfaces

## Why It Matters
While rarely used in typical web interfaces, `scaleZ()` is essential for precise 3D object construction (cubes, boxes). It scales the Z-axis extent of child elements.

## Common Patterns
```css
/* Constructing 3D cube faces */
.cube {
  perspective: 1000px;
}

.cube-front {
  transform: translateZ(100px);
}

.cube-back {
  transform: rotateY(180deg) translateZ(100px);
}

/* Non-square 3D object */
.box {
  transform: scaleZ(1.5);  /* taller in Z-depth */
}
```

## Interaction with translateZ
- `scaleZ()` acts as a multiplier on `translateZ()` child positioning
- `translateZ(100px) scaleZ(2)` = effective `translateZ(200px)` for children
- Order matters: apply scale first, then translate

## Performance Note
- Lightweight operation; no layout impact
- Primarily useful for mathematical precision in 3D geometry
- Avoid overuse; simpler than using multiple individual transforms

## Related Rules
- [`function-translateZ`](function-translateZ.md)
- [`function-matrix3d`](function-matrix3d.md)
- [`pattern-cube`](pattern-cube.md)
