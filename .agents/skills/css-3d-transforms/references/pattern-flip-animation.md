# Practical 3D Patterns: Smooth Flip Animations

## Principle
Flip animations smoothly transition between card faces using `transition` or `@keyframes`. The key is animating the `rotateY()` value while keeping `backface-visibility: hidden` to hide non-visible faces during the flip.

## Application
```css
/* Hover-triggered flip */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Click-triggered flip with JavaScript */
.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

/* JavaScript */
const card = document.querySelector('.flip-card-inner');
card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});
```

## Smooth Timing Examples
```css
/* Default smooth flip (0.6s) */
.flip-card-inner {
  transition: transform 0.6s ease-out;  /* decelerating end */
}

/* Fast flip (0.3s) */
.flip-card-inner.fast {
  transition: transform 0.3s ease-out;
}

/* Slow, dramatic flip (1s) */
.flip-card-inner.slow {
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);  /* bouncy */
}

/* Linear spin (mechanical feel) */
.flip-card-inner.mechanical {
  transition: transform 0.8s linear;
}
```

## Easing Functions for Realistic Motion
```css
/* Ease-out: starts fast, ends slow (natural deceleration) */
.flip-ease-out {
  transition: transform 0.6s ease-out;
}

/* Ease-in-out: accelerates then decelerates (careful start/stop) */
.flip-ease-in-out {
  transition: transform 0.6s ease-in-out;
}

/* Custom cubic-bezier: fine control */
.flip-custom {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Spring-like overshoot */
.flip-spring {
  animation: flip-spring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes flip-spring {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}
```

## Keyframe Animations for Complex Flips
```css
/* Multi-step flip with intermediate states */
.flip-card-inner {
  animation: flip-sequence 1s ease-in-out;
}

@keyframes flip-sequence {
  0% {
    transform: rotateY(0deg) scaleX(1);
  }
  50% {
    transform: rotateY(90deg) scaleX(0.8);  /* squeeze at midpoint */
  }
  100% {
    transform: rotateY(180deg) scaleX(1);
  }
}

/* Flip with tilt effect */
@keyframes flip-tilt {
  0% {
    transform: rotateY(0deg) rotateZ(0deg);
  }
  50% {
    transform: rotateY(90deg) rotateZ(10deg);  /* tilt during flip */
  }
  100% {
    transform: rotateY(180deg) rotateZ(0deg);
  }
}
```

## Direction Control
```css
/* Forward flip */
.flip-forward {
  animation: flip-forward 0.6s ease-out;
}

@keyframes flip-forward {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
}

/* Reverse flip (back toward original) */
.flip-reverse {
  animation: flip-reverse 0.6s ease-out;
}

@keyframes flip-reverse {
  from { transform: rotateY(180deg); }
  to { transform: rotateY(0deg); }
}

/* Clock-wise vs counter-clockwise */
.flip-cw {
  transform: rotateY(180deg);  /* clockwise (positive) */
}

.flip-ccw {
  transform: rotateY(-180deg);  /* counter-clockwise (negative) */
}
```

## State-Based Animations
```css
/* CSS states */
.flip-card.is-flipped .flip-card-inner {
  transform: rotateY(180deg);
  transition: transform 0.6s ease-out;
}

.flip-card.is-flipped:hover .flip-card-inner {
  transform: rotateY(180deg) rotateZ(5deg);  /* wiggle when flipped */
  transition: transform 0.3s ease-out;
}

/* Animation direction */
.flip-card.is-flipped .flip-card-inner {
  animation-direction: reverse;  /* unwind animation */
}
```

## Performance Optimization
```css
/* Enable GPU acceleration */
.flip-card-inner {
  will-change: transform;  /* hint: this will animate */
  transition: transform 0.6s ease-out;
}

/* Disable after animation completes */
.flip-card-inner.is-flipped {
  will-change: auto;
}
```

## Accessibility Considerations
```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .flip-card-inner {
    transition: none;
  }
  
  .flip-card:hover .flip-card-inner,
  .flip-card-inner.flipped {
    transform: rotateY(180deg);  /* instant, no animation */
  }
}
```

## Chaining Multiple Flips
```css
/* Consecutive flips */
.flip-multiple {
  animation: flip-triple 1.8s ease-in-out;
}

@keyframes flip-triple {
  0% { transform: rotateY(0deg); }
  33% { transform: rotateY(180deg); }
  66% { transform: rotateY(360deg); }
  100% { transform: rotateY(540deg); }
}
```

## Related Rules
- [`pattern-card-flip`](pattern-card-flip.md)
- [`timing-300ms-max`](timing-300ms-max.md) (from animations skill)
- [`render-backface-hidden`](render-backface-hidden.md)
