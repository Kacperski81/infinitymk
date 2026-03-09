# Browser Support & Fallbacks: Feature Detection Before Using 3D

## Principle
Use CSS `@supports` or JavaScript feature detection to safely check for 3D transform support before applying complex 3D structures. This enables graceful degradation—modern browsers get 3D, others get simplified layouts.

## CSS Feature Detection
```css
/* Check for transform-style support */
@supports (transform-style: preserve-3d) {
  /* Modern browsers: use 3D transforms */
  .carousel {
    transform-style: preserve-3d;
    transform: rotateY(var(--angle));
  }
}

@supports not (transform-style: preserve-3d) {
  /* Fallback for older browsers */
  .carousel {
    overflow-x: auto;
  }
}

/* Check for perspective support */
@supports (perspective: 1000px) {
  .element {
    perspective: 1000px;
  }
}

/* Check for specific transform functions */
@supports (transform: rotateY(45deg)) {
  .element {
    transform: rotateY(45deg);
  }
}
```

## JavaScript Feature Detection
```javascript
// Check preserve-3d support
const supportsPreserve3D = () => {
  return CSS.supports('transform-style', 'preserve-3d');
};

// Check perspective support
const supportsPerspective = () => {
  return CSS.supports('perspective', '1000px');
};

// Check for 3D transform functions
const supportsRotateY = () => {
  return CSS.supports('transform', 'rotateY(45deg)');
};

// Check transform-origin with Z value
const supports3DTransformOrigin = () => {
  return CSS.supports('transform-origin', '50% 50% 100px');
};

// Complete feature check
const supports3DTransforms = () => {
  return (
    supportsPreserve3D() &&
    supportsPerspective() &&
    supportsRotateY()
  );
};

// Usage
if (supports3DTransforms()) {
  // Initialize 3D carousel
  initiate3DCarousel();
} else {
  // Initialize 2D fallback
  initialize2DCarousel();
}
```

## Practical Implementation Pattern
```javascript
// Feature detection hook
function useSupports3D() {
  const [supports3D, setSupports3D] = React.useState(false);
  
  React.useEffect(() => {
    const hasSupport = CSS.supports('transform-style', 'preserve-3d');
    setSupports3D(hasSupport);
  }, []);
  
  return supports3D;
}

// Usage in component
function Carousel() {
  const supports3D = useSupports3D();
  
  return supports3D ? <Carousel3D /> : <Carousel2D />;
}
```

## Class-Based Approach
```javascript
// Add class to root element
const root = document.documentElement;
if (CSS.supports('transform-style', 'preserve-3d')) {
  root.classList.add('supports-3d-transforms');
} else {
  root.classList.add('no-3d-transforms');
}
```

```css
/* Use class for conditional styling */
.supports-3d-transforms .carousel {
  transform-style: preserve-3d;
  transform: rotateY(var(--angle));
}

.no-3d-transforms .carousel {
  overflow-x: auto;
  scroll-behavior: smooth;
}
```

## Check for Multiple Features
```javascript
// Comprehensive 3D support check
const check3DFeaturesSupport = () => {
  const features = {
    perspective: CSS.supports('perspective', '1000px'),
    transformStyle: CSS.supports('transform-style', 'preserve-3d'),
    rotateX: CSS.supports('transform', 'rotateX(45deg)'),
    rotateY: CSS.supports('transform', 'rotateY(45deg)'),
    translateZ: CSS.supports('transform', 'translateZ(100px)'),
    backfaceVisibility: CSS.supports('backface-visibility', 'hidden'),
  };
  
  const allSupported = Object.values(features).every(v => v);
  return { features, allSupported };
};

const { features, allSupported } = check3DFeaturesSupport();
console.log('3D transforms fully supported:', allSupported);
```

## Conditional Initialization
```javascript
// Initialize appropriate carousel based on support
function initCarousel() {
  const supports3D = CSS.supports('transform-style', 'preserve-3d');
  
  if (supports3D) {
    return new Carousel3D({
      perspective: 1000,
      rotateAxis: 'Y',
    });
  } else {
    return new CarouselScroll({
      direction: 'horizontal',
      snapPoints: true,
    });
  }
}
```

## Why Feature Detection Matters
- **Graceful degradation**: Works everywhere
- **No console errors**: Detects before using unsupported features
- **User experience**: Modern browsers get enhanced features
- **Maintenance**: Single codebase with conditional features

## Best Practices
```css
/* ✅ Correct: detect before using complex features */
@supports (transform-style: preserve-3d) {
  .complex-3d {
    transform-style: preserve-3d;
  }
}

/* ❌ Wrong: rely on unsupported features */
.complex-3d {
  transform-style: preserve-3d;  /* may not work */
}
```

## Related Rules
- [`support-modern-browsers`](support-modern-browsers.md)
- [`support-webkit-prefix`](support-webkit-prefix.md)
- [`support-ie11-fallback`](support-ie11-fallback.md)
- [`render-ie11-limitation`](render-ie11-limitation.md)
