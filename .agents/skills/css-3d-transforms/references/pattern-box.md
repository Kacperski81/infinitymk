# Practical 3D Patterns: Building Open-Sided 3D Boxes

## Principle
3D boxes are similar to cubes but can be open-sided, showing interior content. They're constructed from selected faces (typically 5 sides, leaving one open) positioned in 3D space with perspective and `preserve-3d`.

## Application
```css
/* Box container with perspective */
.box {
  perspective: 1000px;
  width: 300px;
  height: 200px;
}

/* Box inner wrapper */
.box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 0.6s;
}

/* Box faces */
.box-face {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(100, 150, 255, 0.3);
}

/* Specific face positioning */
.box-front {
  width: 300px;
  height: 200px;
  transform: translateZ(100px);
}

.box-back {
  width: 300px;
  height: 200px;
  transform: rotateY(180deg) translateZ(100px);
}

.box-left {
  width: 200px;
  height: 200px;
  left: -100px;
  transform: rotateY(-90deg) translateZ(100px);
}

.box-right {
  width: 200px;
  height: 200px;
  right: -100px;
  transform: rotateY(90deg) translateZ(100px);
}

.box-top {
  width: 300px;
  height: 200px;
  top: -100px;
  transform: rotateX(90deg) translateZ(100px);
}

/* Bottom-open box (omit .box-bottom) */
```

## HTML Structure (5-sided box)
```html
<div class="box">
  <div class="box-inner">
    <div class="box-face box-front">Front</div>
    <div class="box-face box-back">Back</div>
    <div class="box-face box-left">Left</div>
    <div class="box-face box-right">Right</div>
    <div class="box-face box-top">Top</div>
    <!-- box-bottom omitted for open bottom -->
  </div>
</div>
```

## Common Box Configurations
```css
/* Top-open box */
.topless-box {
  /* Omit .box-top face */
}

/* Bottom-open box */
.bottomless-box {
  /* Omit .box-bottom face */
}

/* Front-open box (reveal interior) */
.open-front-box {
  /* Omit .box-front face */
}

/* Minimal: 3-sided container */
.minimal-box {
  /* Include only left, right, back faces */
}
```

## Interior Content Patterns
```css
/* Content inside the box */
.box-inner {
  /* Interior content visible through open side */
}

.box-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

/* Scrollable interior */
.box-interior-scroll {
  overflow-y: auto;
  max-height: 100%;
}
```

## Depth Variations
```css
/* Shallow box */
.shallow-box-face {
  /* Reduce translateZ: 50px instead of 100px */
}

/* Deep box */
.deep-box-face {
  /* Increase translateZ: 150px instead of 100px */
}

/* Non-uniform depth */
.stretched-box {
  width: 400px;  /* wider than tall */
  height: 200px;
}

.stretched-box-left {
  width: 200px;
}
```

## Use Cases
- 3D product containers showing interior
- Stage/scene backdrop effects
- Interior space visualization
- Educational 3D diagrams
- Reveal animations (open/close box)

## Interactive Example
```css
/* Click to open/close */
.box-inner {
  transform: rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(var(--rz));
  transition: transform 0.6s ease;
}

.box.open .box-inner {
  transform: rotateX(-90deg);  /* look inside from top */
}

.box.closed .box-inner {
  transform: rotateX(0deg);    /* front view */
}
```

## Performance Notes
- Fewer faces = better performance (3-4 faces lighter than full cube)
- Use perspective: 800-1500px
- Open sides allow peek-through interaction
- Interior scrolling may need overflow handling

## Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  .box-inner {
    transition: none;
    transform: rotateX(var(--rx)) rotateY(var(--ry));
  }
}
```

## Related Rules
- [`pattern-cube`](pattern-cube.md)
- [`nesting-preserve-3d`](nesting-preserve-3d.md)
- [`function-translateZ`](function-translateZ.md)
