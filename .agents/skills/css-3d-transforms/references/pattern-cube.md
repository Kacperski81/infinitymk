# Practical 3D Patterns: Constructing 3D Cubes

## Principle
3D cubes are constructed from six positioned faces (front, back, left, right, top, bottom), each rotated and translated in 3D space. The parent uses `perspective` and `transform-style: preserve-3d` to render them as a coherent 3D object.

## Application
```css
/* Cube container with perspective */
.cube {
  perspective: 1000px;
  width: 200px;
  height: 200px;
}

/* Cube inner wrapper with preserve-3d */
.cube-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.6s;
}

/* Individual cube faces */
.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  border: 2px solid rgba(255, 255, 255, 0.3);
  opacity: 0.9;
}

/* Position each face */
.cube-front {
  background-color: rgba(255, 0, 0, 0.5);
  transform: translateZ(100px);
}

.cube-back {
  background-color: rgba(0, 255, 0, 0.5);
  transform: rotateY(180deg) translateZ(100px);
}

.cube-left {
  background-color: rgba(0, 0, 255, 0.5);
  transform: rotateY(-90deg) translateZ(100px);
}

.cube-right {
  background-color: rgba(255, 255, 0, 0.5);
  transform: rotateY(90deg) translateZ(100px);
}

.cube-top {
  background-color: rgba(255, 0, 255, 0.5);
  transform: rotateX(90deg) translateZ(100px);
}

.cube-bottom {
  background-color: rgba(0, 255, 255, 0.5);
  transform: rotateX(-90deg) translateZ(100px);
}
```

## HTML Structure
```html
<div class="cube">
  <div class="cube-inner">
    <div class="cube-face cube-front">Front</div>
    <div class="cube-face cube-back">Back</div>
    <div class="cube-face cube-left">Left</div>
    <div class="cube-face cube-right">Right</div>
    <div class="cube-face cube-top">Top</div>
    <div class="cube-face cube-bottom">Bottom</div>
  </div>
</div>
```

## Key Principles
- **Size consistency**: All faces same size (200px × 200px)
- **TranslateZ depth**: Half the face width (100px for 200px faces)
- **Rotation + translation**: Rotate axis, then translate forward
- **Paired faces**: Front/Back pairs, Left/Right pairs, Top/Bottom pairs
- **Preserve-3d required**: Essential for proper face rendering

## Face Positioning Guide
```
Front:  rotateY(0°)   translateZ(100px)
Back:   rotateY(180°) translateZ(100px)
Left:   rotateY(-90°) translateZ(100px)
Right:  rotateY(90°)  translateZ(100px)
Top:    rotateX(90°)  translateZ(100px)
Bottom: rotateX(-90°) translateZ(100px)
```

## Interactive Rotation Example
```css
/* Auto-rotate the cube */
.cube-inner {
  animation: rotate-cube 5s infinite linear;
}

@keyframes rotate-cube {
  0% {
    transform: rotateX(0deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg);
  }
}

/* Mouse-controlled rotation */
.cube-inner.interactive {
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  cursor: grab;
}
```

## Non-Square Variations
```css
/* Rectangular box (taller) */
.tall-cube-inner {
  width: 200px;
  height: 400px;  /* taller */
}

.tall-cube-face {
  width: 200px;
  height: 400px;
}

.tall-cube-front {
  transform: translateZ(100px);
}

/* Different depth */
.deep-cube-front {
  transform: translateZ(150px);  /* deeper */
}
```

## Common Use Cases
- 3D product viewers
- Rotating portfolio showcases
- Educational cube animations
- Interactive learning tools
- Visual data representations

## Performance Considerations
- Use `will-change: transform` on animated cubes
- Perspective values: 800-1500px
- Face opacity/colors add visual depth
- GPU acceleration on transform changes

## Related Rules
- [`nesting-preserve-3d`](nesting-preserve-3d.md)
- [`function-rotateX`](function-rotateX.md)
- [`function-rotateY`](function-rotateY.md)
- [`function-translateZ`](function-translateZ.md)
- [`pattern-carousel-3d`](pattern-carousel-3d.md)
