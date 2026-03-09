# Browser Support & Fallbacks: Modern Browser Support for 3D Transforms

## Principle
CSS 3D Transforms have excellent support across all modern browsers (Chrome, Firefox, Safari, Edge). As of 2024, 3D transforms are supported by 98%+ of users in production environments.

## Current Browser Support
```
✅ Chrome 26+
✅ Firefox 10+
✅ Safari 9+
✅ Edge 12+
✅ Opera 15+
⚠️ IE 11: No preserve-3d support for nested elements (see render-ie11-limitation)
```

## Support Status
- **2D Transforms**: Supported in 98%+ of browsers
- **3D Transforms**: Supported in 95%+ of modern browsers
- **preserve-3d**: Supported in all modern browsers except IE11
- **WebKit prefix**: Required for older Safari/Chrome versions

## Checking Support
```css
/* Feature detection with @supports */
@supports (transform-style: preserve-3d) {
  /* Modern browser: use 3D */
  .carousel {
    transform-style: preserve-3d;
  }
}

@supports not (transform-style: preserve-3d) {
  /* Older browser: fallback */
  .carousel {
    overflow-x: auto;
  }
}
```

## JavaScript Detection
```javascript
// Check perspective support
const supports3DTransforms = () => {
  const element = document.createElement('div');
  const style = element.style;
  
  return (
    style.perspective !== undefined ||
    style.webkitPerspective !== undefined
  );
};

// Check preserve-3d support
const supportsPreserve3D = () => {
  const element = document.createElement('div');
  const style = element.style;
  
  return CSS.supports('transform-style', 'preserve-3d');
};

if (supports3DTransforms()) {
  // Use 3D transforms
} else {
  // Use 2D fallback
}
```

## Vendor Prefixes for Older Browsers
```css
/* Prefixed versions (older Safari/Chrome) */
.element {
  -webkit-perspective: 1000px;
  perspective: 1000px;
  
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  
  -webkit-transform: rotateY(45deg);
  transform: rotateY(45deg);
}
```

## Browser Timeline
- **2009-2012**: Initial Safari/Chrome adoption
- **2015+**: Universal modern browser support
- **2018+**: Prefixes no longer needed for new browsers
- **2024**: Only IE11 lacks `preserve-3d` for nesting

## No Major Gotchas
- 3D transforms work consistently across browsers
- Minor differences in performance, not features
- Perspective values work identically
- No cross-browser angle unit issues

## Testing Across Browsers
```javascript
// Test 3D transform rendering
const testWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
};
```

## Why Universal Support Matters
- No need for JavaScript polyfills
- CSS-only 3D works everywhere modern
- Progressive enhancement is simple
- Graceful degradation is straightforward

## Related Rules
- [`support-webkit-prefix`](support-webkit-prefix.md)
- [`support-ie11-fallback`](support-ie11-fallback.md)
- [`support-feature-detection`](support-feature-detection.md)
- [`render-ie11-limitation`](render-ie11-limitation.md)
