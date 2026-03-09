"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";

export type ViewportAnimationOptions = {
  /** Parallax speed for background elements (default: 0.15) */
  bgParallaxSpeed?: number;
  /** Parallax speed for content elements (default: 0.06) */
  contentParallaxSpeed?: number;
  /** Enable fade-in effect when element enters viewport (default: true) */
  fadeInEnabled?: boolean;
  /** Enable fade-out effect when element exits viewport (default: true) */
  fadeOutEnabled?: boolean;
  /** Distance from viewport bottom where fade-in starts (default: 200) */
  fadeInDistance?: number;
  /** Percentage of section height where fade-out begins (default: 0.15) */
  fadeOutStart?: number;
  /** Percentage of section height where fade-out ends (default: 0.85) */
  fadeOutEnd?: number;
  /** Enable scale effect for images (default: false) */
  imageScaleEnabled?: boolean;
  /** Minimum scale for images when entering from below (default: 0.85) */
  imageScaleMin?: number;
  /** Maximum scale for images when exiting toward top (default: 1.15) */
  imageScaleMax?: number;
  /** Minimum opacity for images at viewport edges (default: 0.3) */
  imageOpacityMin?: number;
}

export type ViewportAnimationResult = {
  ref: React.RefObject<HTMLElement | null>;
  /** Opacity for main content (0-1) */
  contentOpacity: number;
  /** Y translation for content parallax effect */
  contentTranslateY: number;
  /** Y offset for background parallax */
  bgParallax: number;
  /** Scale value for image focus effect (0.85-1.0) */
  imageScale: number;
  /** Opacity for image focus effect (0.3-1.0) */
  imageOpacity: number;
  /** -1 to 1: negative = below viewport center, 0 = at center, positive = above center */
  viewportProgress: number;
  /** Whether element is currently visible in viewport */
  isInViewport: boolean;
}

/**
 * Enhanced viewport animation hook with bidirectional fade effects and image focus.
 * 
 * Features:
 * - Fade-in as elements enter viewport from below
 * - Fade-out as elements scroll past viewport top
 * - Background and content parallax
 * - Image "focus" effect: images scale/fade based on distance from viewport center
 * 
 * @param scrollY - Current virtual scroll position from useSmoothScroll
 * @param viewportHeight - Window inner height
 * @param options - Animation configuration options
 */
export function useViewportAnimation(
  scrollY: number,
  viewportHeight: number,
  options: ViewportAnimationOptions = {}
): ViewportAnimationResult {
  const {
    bgParallaxSpeed = 0.15,
    contentParallaxSpeed = 0.06,
    fadeInEnabled = true,
    fadeOutEnabled = true,
    fadeInDistance = 200,
    fadeOutStart = 0.15,
    fadeOutEnd = 0.85,
    imageScaleEnabled = false,
    imageScaleMin = 0.85,
    imageScaleMax = 1.15,
    imageOpacityMin = 0.3,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Keep a ref to the latest scrollY so measure() can read it at call-time
  // without being captured in a stale closure.
  // Bug this fixes: measure() had scrollY in its deps, so it was recreated
  // every RAF frame. The useEffect re-ran, tearing down and re-adding the
  // resize listener 60×/s. Worse, between setScrollState() and the effect
  // running, another RAF frame fired — so getBoundingClientRect() reflected
  // the new transform while the closure held the old scrollY, making
  // sectionTop too small and triggering the fade-out while content was
  // still centered in the viewport (content appeared invisible).
  const scrollYRef = useRef(scrollY);
  // No dep array — syncs every render, always reflects the latest committed value.
  useEffect(() => {
    scrollYRef.current = scrollY;
  });

  // measure is now stable: using scrollYRef.current instead of the closure.
  // The resize/orientationchange listener is registered exactly once.
  const measure = useCallback(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const top = rect.top + scrollYRef.current;
    setSectionTop(top);
    setSectionHeight(rect.height);
  }, []); // stable — no scrollY dep

  // Detect and respond to prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Register resize listener once; measure also on mount.
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return useMemo(() => {
    const el = ref.current;
    if (!el || sectionHeight === 0 || viewportHeight === 0) {
      return {
        ref,
        contentOpacity: 1,
        contentTranslateY: 0,
        bgParallax: 0,
        imageScale: 1,
        imageOpacity: 1,
        viewportProgress: 0,
        isInViewport: false,
      };
    }

    // Return neutral values when the user prefers no motion.
    if (prefersReducedMotion) {
      return {
        ref,
        contentOpacity: 1,
        contentTranslateY: 0,
        bgParallax: 0,
        imageScale: 1,
        imageOpacity: 1,
        viewportProgress: 0,
        isInViewport: true,
      };
    }

    // How far the section's top has scrolled past the viewport top
    const relativeScroll = scrollY - sectionTop;
    
    // Section center position relative to viewport center
    const sectionCenter = sectionTop + sectionHeight / 2;
    const viewportCenter = scrollY + viewportHeight / 2;
    const distanceFromCenter = sectionCenter - viewportCenter;
    
    // Normalized progress: -1 (below), 0 (center), 1 (above)
    const maxDistance = (viewportHeight + sectionHeight) / 2;
    const viewportProgress = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
    
    // Check if in viewport
    const sectionBottom = sectionTop + sectionHeight;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + viewportHeight;
    const isInViewport = sectionBottom > viewportTop && sectionTop < viewportBottom;

    // --- FADE-IN EFFECT (entering from below) ---
    let fadeInOpacity = 1;
    let fadeInTranslateY = 0;
    
    if (fadeInEnabled && isInViewport) {
      // Distance from section top to viewport bottom
      const distanceFromBottom = viewportBottom - sectionTop;
      
      if (distanceFromBottom < fadeInDistance && distanceFromBottom > 0) {
        const progress = distanceFromBottom / fadeInDistance;
        fadeInOpacity = Math.max(0, Math.min(1, progress));
        fadeInTranslateY = (1 - progress) * 40; // Start 40px below, move up
      }
    }

    // --- FADE-OUT EFFECT (scrolling past top) ---
    let fadeOutOpacity = 1;
    let fadeOutTranslateY = 0;
    
    if (fadeOutEnabled && sectionHeight > 0) {
      const fadeStartPx = sectionHeight * fadeOutStart;
      const fadeEndPx = sectionHeight * fadeOutEnd;
      
      if (relativeScroll > fadeStartPx) {
        const progress = Math.min(
          (relativeScroll - fadeStartPx) / (fadeEndPx - fadeStartPx),
          1
        );
        fadeOutOpacity = Math.max(0, 1 - progress);
        fadeOutTranslateY = progress * -40; // Move up as it fades
      }
    }

    // Combined content opacity (minimum of fade-in and fade-out)
    const contentOpacity = Math.min(fadeInOpacity, fadeOutOpacity);
    const contentTranslateY = fadeInTranslateY + fadeOutTranslateY;

    // --- PARALLAX ---
    const clamped = Math.max(0, relativeScroll);
    const bgParallax = clamped * bgParallaxSpeed;
    const contentParallax = clamped * contentParallaxSpeed;

    // --- IMAGE FOCUS EFFECT ---
    let imageScale = 1;
    let imageOpacity = 1;
    
    if (imageScaleEnabled && isInViewport) {
      if (viewportProgress <= 0) {
        // Entering from below: scale from imageScaleMax → 1.0 (comes in big, shrinks to normal), fade in
        const enterProgress = Math.abs(viewportProgress); // 1 at bottom edge, 0 at center
        imageScale = 1 + enterProgress * (imageScaleMax - 1);
        imageOpacity = imageOpacityMin + (1 - enterProgress) * (1 - imageOpacityMin);
      } else {
        // Exiting toward top: scale from 1.0 → imageScaleMin (gets smaller), fade out
        const exitProgress = viewportProgress; // 0 at center, 1 at top edge
        imageScale = imageScaleMin + (1 - exitProgress) * (1 - imageScaleMin);
        imageOpacity = Math.max(0, imageOpacityMin + (1 - exitProgress) * (1 - imageOpacityMin));
      }
    }

    return {
      ref,
      contentOpacity,
      contentTranslateY: contentTranslateY + contentParallax,
      bgParallax,
      imageScale,
      imageOpacity,
      viewportProgress,
      isInViewport,
    };
  }, [
    scrollY,
    viewportHeight,
    sectionTop,
    sectionHeight,
    bgParallaxSpeed,
    contentParallaxSpeed,
    fadeInEnabled,
    fadeOutEnabled,
    fadeInDistance,
    fadeOutStart,
    fadeOutEnd,
    imageScaleEnabled,
    imageScaleMin,
    imageScaleMax,
    imageOpacityMin,
    prefersReducedMotion,
  ]);
}
