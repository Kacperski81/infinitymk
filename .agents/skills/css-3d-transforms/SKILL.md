---
name: css-3d-transforms
description: CSS 3D Transforms for building immersive web interfaces. Use when adding depth, perspective, card flips, carousels, cubes, or spatial layouts. Based on desandro's comprehensive guide and enables 3D-enhanced UI elements.
---

# CSS 3D Transforms

CSS 3D transforms move web design beyond flat interfaces, enabling depth, perspective, and spatial dimensionality to solve real interface challenges—not just visual eye candy. Use 3D transforms to communicate carousel structure, create intuitive card flips, build 3D objects, or enhance transitions with meaningful spatial motion.

## When to Apply

Reference these guidelines when:
- Adding perspective and depth to interfaces
- Building card flip or reveal transitions
- Creating 3D carousels with perspective cycling
- Constructing 3D geometric objects (cubes, boxes)
- Implementing transform-origin for rotation points
- Handling browser support and IE11 limitations
- Enhancing transitions with 3D spatial motion
- Managing rendered-3d layers and performance

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Perspective Foundation | CRITICAL | `perspective-` |
| 2 | 3D Transform Functions | CRITICAL | `function-` |
| 3 | Transform Origin & Nesting | HIGH | `origin-` |
| 4 | Preserve 3D & Rendering | HIGH | `render-` |
| 5 | Practical 3D Patterns | MEDIUM | `pattern-` |
| 6 | Browser Support & Fallbacks | MEDIUM | `support-` |

## Quick Reference

### 1. Perspective Foundation (CRITICAL)

- [`perspective-define`](references/perspective-define.md) — Use `perspective` property to set vanishing point distance
- [`perspective-origin`](references/perspective-origin.md) — Position the vanishing point with `perspective-origin`
- [`perspective-container`](references/perspective-container.md) — Apply perspective to parent for nested elements effect
- [`perspective-vs-function`](references/perspective-vs-function.md) — Use `perspective()` function vs property based on use case

### 2. 3D Transform Functions (CRITICAL)

- [`function-rotateX`](references/function-rotateX.md) — Rotate around horizontal axis with `rotateX()`
- [`function-rotateY`](references/function-rotateY.md) — Rotate around vertical axis with `rotateY()`
- [`function-rotateZ`](references/function-rotateZ.md) — Rotate around Z-axis; treat like 2D rotate
- [`function-translateZ`](references/function-translateZ.md) — Move elements closer/farther in Z space with `translateZ()`
- [`function-scaleZ`](references/function-scaleZ.md) — Scale depth with `scaleZ()` combined with `translateZ()`
- [`function-matrix3d`](references/function-matrix3d.md) — Use `matrix3d()` for complex combined transforms

### 3. Transform Origin & Nesting (HIGH)

- [`origin-default-center`](references/origin-default-center.md) — Transform origin defaults to center (50%, 50%, 0)
- [`origin-set-explicitly`](references/origin-set-explicitly.md) — Set `transform-origin` for non-center rotation points
- [`origin-3d-value`](references/origin-3d-value.md) — Use three values for Z offset in transform origin
- [`nesting-preserve-3d`](references/nesting-preserve-3d.md) — Use `transform-style: preserve-3d` for nested 3D elements

### 4. Preserve 3D & Rendering (HIGH)

- [`render-backface-hidden`](references/render-backface-hidden.md) — Hide back faces with `backface-visibility: hidden`
- [`render-preserve-3d-required`](references/render-preserve-3d-required.md) — `preserve-3d` required for child visibility in 3D parent
- [`render-ie11-limitation`](references/render-ie11-limitation.md) — IE11 doesn't support `preserve-3d` for nested elements
- [`render-stacking-context`](references/render-stacking-context.md) — 3D transforms create new stacking context

### 5. Practical 3D Patterns (MEDIUM)

- [`pattern-card-flip`](references/pattern-card-flip.md) — Create card flip transitions with `rotateY()` and `backface-visibility`
- [`pattern-carousel-3d`](references/pattern-carousel-3d.md) — Build rotating 3D carousels with perspective and rotateY
- [`pattern-cube`](references/pattern-cube.md) — Construct 3D cubes from six positioned faces
- [`pattern-box`](references/pattern-box.md) — Build open-sided 3D boxes for visual effects
- [`pattern-flip-animation`](references/pattern-flip-animation.md) — Transition between front and back faces smoothly

### 6. Browser Support & Fallbacks (MEDIUM)

- [`support-modern-browsers`](references/support-modern-browsers.md) — 3D transforms supported in all modern browsers
- [`support-webkit-prefix`](references/support-webkit-prefix.md) — Add `-webkit-` prefix for older Safari/Chrome versions
- [`support-ie11-fallback`](references/support-ie11-fallback.md) — Plan fallbacks for IE11 lack of `preserve-3d` support
- [`support-feature-detection`](references/support-feature-detection.md) — Detect 3D support before applying complex transforms

## Key Concepts

### Core 3D Space
- **Perspective**: Creates vanishing point; 500-1500px typical default
- **Z-axis**: Positive moves toward viewer, negative away
- **Transform origin**: Point of rotation in 3D space
- **Backface**: Rear side of element in 3D rotation

### Common Use Cases
- **Card Flips**: `rotateY()` + `backface-visibility: hidden` + perspective
- **Carousels**: Children positioned + rotated by Z-depth + parent perspective
- **Cubes/Boxes**: Six faces positioned in 3D space with perspective parent
- **Depth Effects**: `translateZ()` + perspective for layered depth

### Performance Considerations
- Use `will-change: transform` for animated 3D elements
- 3D transforms create rendering layers; use sparingly on large pages
- Transitions beat animations for smoother 3D motion
- Test performance on low-end devices

## Resources
- [CSS 3D Transforms on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [desandro's Intro to CSS 3D Transforms](https://3dtransforms.desandro.com/)
- [Can I Use: CSS 3D Transforms](https://caniuse.com/transforms3d)
- [W3C CSS Transforms Module](https://www.w3.org/TR/css-transforms-1/)
