# Perspective Foundation: Define Perspective Distance

## Principle
The `perspective` CSS property defines the distance from the viewer to the Z=0 plane. It's the single most important property for creating believable 3D space.

## Application
```css
.scene {
  perspective: 1000px;
}

.element {
  transform: rotateY(45deg);
}
```

## Key Guidelines
- **Default**: Without perspective, 3D rotations appear flat
- **Typical Range**: 500-1500px creates natural depth (lower = more exaggerated)
- **Smaller values** (300-500px) create dramatic, close-up perspective
- **Larger values** (2000px+) flatten the view, like stepping back
- Apply to **parent** of elements you want to appear in 3D space

## Why It Matters
Perspective gives 3D transforms meaning. Without it, rotations occur but lack spatial depth. The vanishing point created by perspective makes geometric arrangements (carousels, cubes) visually coherent.

## Common Values
- `800px` - Standard web interface depth
- `1000px` - Comfortable viewing distance  
- `1200px` - Gentler perspective for conservative designs
- `500px` - Dramatic, immersive effect

## Related Rules
- [`perspective-origin`](perspective-origin.md)
- [`perspective-container`](perspective-container.md)
- [`function-rotateY`](function-rotateY.md)
