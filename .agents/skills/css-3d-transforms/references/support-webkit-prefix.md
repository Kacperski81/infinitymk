# Browser Support & Fallbacks: WebKit Prefix for Older Versions

## Principle
Older versions of Safari (pre-9) and Chrome (pre-26) require the `-webkit-` prefix for 3D transforms. While these browsers represent a tiny fraction of users (< 0.5%), prefixing is cheap insurance for older device support.

## When to Use Prefixes
```css
/* Always include -webkit- for maximum compatibility */
.element {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  
  -webkit-transform: rotateY(45deg);
  transform: rotateY(45deg);
}

/* Modern only (if supporting only current browsers) */
.element {
  perspective: 1000px;
  transform-style: preserve-3d;
  transform: rotateY(45deg);
}
```

## Properties Requiring Prefixes
- `-webkit-perspective`
- `-webkit-transform-style`
- `-webkit-transform`
- `-webkit-backface-visibility`
- `-webkit-transform-origin`

## Prefix Patterns
```css
/* Perspective */
.scene {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  
  -webkit-perspective-origin: 50% 50%;
  perspective-origin: 50% 50%;
}

/* Transform-style */
.parent {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}

/* Transform functions */
.element {
  -webkit-transform: rotateY(45deg) translateZ(100px);
  transform: rotateY(45deg) translateZ(100px);
}

/* Backface visibility */
.card-face {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* Transform origin */
.pivot {
  -webkit-transform-origin: 100% 50%;
  transform-origin: 100% 50%;
}
```

## Why Both Values
```css
/* ✅ Correct: both versions */
.element {
  -webkit-transform: rotateY(45deg);  /* Safari & old Chrome */
  transform: rotateY(45deg);           /* Modern browsers (ignores -webkit-) */
}

/* ❌ Wrong: only prefix */
.element {
  -webkit-transform: rotateY(45deg);  /* Modern browsers ignore -webkit- */
  /* transform missing, modern browsers don't work */
}
```

## Tools for Automatic Prefixing
```
PostCSS autoprefixer handles this automatically
Just write unprefixed CSS, autoprefixer adds -webkit- versions
```

## Affected Browser Versions
```
Safari:
  - Safari 8 and earlier: need prefix
  - Safari 9+: no prefix needed

Chrome:
  - Chrome 25 and earlier: need prefix
  - Chrome 26+: no prefix needed

Firefox:
  - Always unprefixed (no prefix version)

Edge:
  - Always unprefixed (no prefix version)
```

## Prefixing Strategy
```css
/* Recommended: always include both */
.cube {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  
  will-change: transform;
}

.cube-inner {
  -webkit-transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform: rotateX(var(--rx)) rotateY(var(--ry));
}
```

## Minimal Browser Support
```css
/* If only supporting current browsers (Chrome 120+, Safari 17+) */
.element {
  perspective: 1000px;
  transform: rotateY(45deg);
}

/* If supporting wider audience */
.element {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  
  -webkit-transform: rotateY(45deg);
  transform: rotateY(45deg);
}
```

## Browser Statistics (2024)
- Safari < 9: 0.1% of users
- Chrome < 26: 0.02% of users
- IE 11: < 1% of users (most who need 3D don't use IE11)

## Related Rules
- [`support-modern-browsers`](support-modern-browsers.md)
- [`support-feature-detection`](support-feature-detection.md)
