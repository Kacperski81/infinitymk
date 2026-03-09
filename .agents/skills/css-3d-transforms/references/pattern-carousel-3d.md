# Practical 3D Patterns: 3D Carousels with Perspective Cycling

## Principle
3D carousels position items in a circular 3D arrangement using `rotateY()` and `translateZ()` with a perspective parent. As the carousel rotates, items cycle into and out of view, creating an intuitive cyclic pattern.

## Application
```css
/* Carousel container with perspective */
.carousel {
  perspective: 1000px;
  width: 100%;
  overflow: hidden;
}

/* Track with preserve-3d for child positioning */
.carousel-track {
  transform-style: preserve-3d;
  transform: rotateY(var(--rotation, 0deg));
  transition: transform 0.6s ease;
  display: flex;
}

/* Individual carousel items positioned in 3D circle */
.carousel-item {
  position: absolute;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -200px;
  
  /* Position in 3D */
  transform: rotateY(var(--angle)) translateZ(250px);
  backface-visibility: hidden;
}

/* N items, evenly distributed around circle */
.carousel-item:nth-child(1) {
  --angle: 0deg;     /* 0° = front, 360/4 = 90° between items */
}

.carousel-item:nth-child(2) {
  --angle: 90deg;
}

.carousel-item:nth-child(3) {
  --angle: 180deg;
}

.carousel-item:nth-child(4) {
  --angle: 270deg;
}
```

## HTML Structure
```html
<div class="carousel">
  <div class="carousel-track" style="--rotation: 0deg">
    <div class="carousel-item">Item 1</div>
    <div class="carousel-item">Item 2</div>
    <div class="carousel-item">Item 3</div>
    <div class="carousel-item">Item 4</div>
  </div>
</div>
```

## JavaScript Control
```javascript
// Rotate carousel
let currentAngle = 0;
function nextSlide() {
  currentAngle -= 90;  // 4 items = 360/4 = 90°
  document.documentElement.style.setProperty('--rotation', currentAngle + 'deg');
}

function previousSlide() {
  currentAngle += 90;
  document.documentElement.style.setProperty('--rotation', currentAngle + 'deg');
}
```

## Key Concepts
- **Items arranged in circle**: 360° / N items = degrees per item
- **translateZ**: Radius of circle (250px typical)
- **Perspective**: Creates depth effect (1000px typical)
- **preserve-3d**: Enables proper 3D positioning
- **backface-visibility**: Hides non-visible items

## Calculating Positions
```
N items = 360 / N = degrees per item
For 4 items: 360 / 4 = 90° apart
For 6 items: 360 / 6 = 60° apart
For 8 items: 360 / 8 = 45° apart

TranslateZ radius: 250px (can adjust for effect)
```

## Common Variations
```css
/* Horizontal carousel (larger radius) */
.large-carousel-item {
  transform: rotateY(var(--angle)) translateZ(400px);
}

/* Vertical carousel (use rotateX) */
.vertical-carousel-track {
  transform: rotateX(var(--rotation, 0deg));
}

.vertical-carousel-item {
  transform: rotateX(var(--angle)) translateZ(250px);
}

/* Centered focus effect */
.carousel-item {
  opacity: 0.5;
}

.carousel-item.active {
  opacity: 1;
  z-index: 10;
}
```

## Why It Works
3D positioning intuitively communicates cyclical structure. Users understand that items wrap around in 3D space.

## Common Use Cases
- Product showcase carousels
- Image galleries
- Portfolio piece rotators
- Testimonial cycles
- Feature highlights

## Performance Notes
- Use CSS custom properties (--rotation) to avoid layout thrashing
- Minimize repaints with `will-change: transform`
- Keep perspective value between 800-1500px
- Test on lower-end devices

## Related Rules
- [`nesting-preserve-3d`](nesting-preserve-3d.md)
- [`function-rotateY`](function-rotateY.md)
- [`function-translateZ`](function-translateZ.md)
- [`pattern-cube`](pattern-cube.md)
