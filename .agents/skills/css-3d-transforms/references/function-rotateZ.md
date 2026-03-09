# 3D Transform Functions: Rotate Around Z Axis

## Principle
`rotateZ()` rotates an element around the Z axis (screen plane). It's functionally identical to the 2D `rotate()` function—elements spin in place on the screen without apparent depth.

## Application
```css
.element {
  transform: rotateZ(45deg);
}

/* Equivalent to 2D rotate */
.element {
  transform: rotate(45deg);
}

/* Combined 3D rotations */
.element {
  transform: rotateZ(45deg) rotateX(30deg);
}
```

## Key Guidelines
- **Syntax**: `rotateZ(angle)` where angle is deg, grad, rad, or turn
- **Functionally identical** to 2D `rotate()` function
- **No perspective needed** for visual effect
- Doesn't create depth, only spins element in place
- Useful when combined with `rotateX()` and `rotateY()` for complex rotations
- 0deg = no rotation, 180deg = upside-down

## Visual Mental Model
- Imagine **spinning a plate on a table** (rotation around vertical post)
- No depth component—pure 2D spinning
- Useful as part of compound 3D transforms
- Not impacted by perspective

## Why It Matters
While `rotateZ()` alone doesn't create 3D effects, it completes the rotation toolset. Combined with `rotateX()` and `rotateY()`, it enables complex spatial positioning.

## Common Patterns
```css
/* Pure 2D spin (no depth) */
.spinner {
  transform: rotateZ(360deg);
  animation: spin 2s linear infinite;
}

/* Part of complex 3D transform */
.complex {
  transform: rotateX(30deg) rotateY(45deg) rotateZ(10deg);
}

/* Tilt card with slight spin */
.card {
  transform: rotateZ(2deg) rotateX(-10deg);
}
```

## Units
- `deg`: Degrees (0-360)
- `turn`: Full rotations (1turn = 360deg)
- `rad`: Radians (2π ≈ 360deg)

## Performance Note
- `rotateZ()` alone may be less optimized than 2D `rotate()` in some browsers
- Use 2D `rotate()` when possible (no X/Y rotations needed)
- Combine with X/Y rotations only when necessary

## Related Rules
- [`function-rotateX`](function-rotateX.md)
- [`function-rotateY`](function-rotateY.md)
- [`function-matrix3d`](function-matrix3d.md)
