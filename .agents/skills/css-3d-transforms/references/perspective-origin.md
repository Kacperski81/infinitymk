# Perspective Foundation: Position Vanishing Point

## Principle
The `perspective-origin` property defines where the vanishing point sits within the viewport. By default it's at the element's center, but repositioning it changes how the 3D scene appears relative to the viewer's implied position.

## Application
```css
.scene {
  perspective: 1000px;
  perspective-origin: 50% 50%;  /* center (default) */
}

.scene.top-view {
  perspective-origin: 50% 0%;  /* vanishing point at top */
}

.scene.right-view {
  perspective-origin: 100% 50%;  /* vanishing point at right */
}
```

## Key Guidelines
- **Default**: `50% 50%` places vanishing point at center
- **Two values**: X-offset, Y-offset (can use px or %)
- **Top/Bottom shift**: Changes horizon; raises/lowers appearance
- **Left/Right shift**: Changes implied viewer position side-to-side
- Pair with appropriate scene composition for visual coherence

## Why It Matters
Perspective-origin subtly changes the perceived viewing angle. For complex 3D scenes like multi-sided cubes, aligning the origin with the scene's composition prevents disorienting spatial distortion.

## Common Values
- `50% 50%` - Centered, neutral (most common)
- `50% 0%` - Vanishing point at top; looking down
- `50% 100%` - Vanishing point at bottom; looking up
- `0% 50%` - Viewer on left side

## Related Rules
- [`perspective-define`](perspective-define.md)
- [`pattern-cube`](pattern-cube.md)
