"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface ScrollFadeOptions {
  /**
   * Fraction of the section that must be inside the virtual viewport
   * before the fade-IN fires. 0.15 = 15 % visible (default).
   */
  inThreshold?: number;
  /** Fraction of section height where fade-out begins (default 0.65). */
  fadeOutStart?: number;
  /** Fraction of section height where fade-out completes (default 0.95). */
  fadeOutEnd?: number;
  /** Max translateY offset applied during fade-out in px (default 36). */
  translateRange?: number;
  /** Parallax multiplier for a background layer (default 0 = disabled). */
  parallaxFactor?: number;
}

export interface ScrollFadeResult {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  /** True once the section has scrolled enough into the virtual viewport. */
  isVisible: boolean;
  /** Fade-out + translate style driven by scroll position. */
  fadeOutStyle: React.CSSProperties;
  /** Parallax translateY style for a background layer. */
  parallaxStyle: React.CSSProperties;
}

/**
 * Scroll-fade + optional parallax hook — v3.
 *
 * Entry detection uses virtual-scroll position math so it works reliably
 * inside a transform-based smooth-scroll wrapper (position: fixed).
 * IntersectionObserver was removed because it cannot reliably detect
 * intersection changes driven only by ancestor CSS transforms.
 *
 * Exit/fade-out uses scroll position math so it feels intentional.
 * Parallax is clamped so backgrounds never over-travel.
 */
export function useScrollFade(
  scrollY: number,
  options: ScrollFadeOptions = {}
): ScrollFadeResult {
  const {
    inThreshold = 0.15,
    fadeOutStart = 0.65,
    fadeOutEnd = 0.95,
    translateRange = 36,
    parallaxFactor = 0,
  } = options;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Stable refs for layout measurements — updated by ResizeObserver, never
  // by scroll, so they don't recreate callbacks on every tick.
  const sectionTopRef = useRef(0);
  const sectionHeightRef = useRef(0);

  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    // Use offsetTop-based measurement that is immune to ancestor transforms
    // and native scroll position. Walk up offsetParent to get the absolute
    // offset from the top of the smooth-scroll wrapper.
    let top = 0;
    let current: HTMLElement | null = el;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }
    sectionTopRef.current = top;
    sectionHeightRef.current = el.offsetHeight;
  }, []); // stable — no scrollY dep

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);

    return () => {
      ro.disconnect();
    };
  }, [measure]);

  // ── Fade-IN driven by virtual scroll position ────────────────────────────
  // Replaces IntersectionObserver which cannot reliably detect intersection
  // changes caused by CSS transforms on a position:fixed ancestor.
  // Fires once (isVisible latches to true).
  // Calling setState during render is the idiomatic React pattern for
  // "derived state" — React discards the in-progress render and immediately
  // re-renders with the updated value. The !isVisible guard prevents loops.
  if (!isVisible) {
    const h = sectionHeightRef.current;
    const top = sectionTopRef.current;
    if (h > 0) {
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
      const sectionBottom = top + h;
      const viewportTop = scrollY;
      const viewportBottom = scrollY + viewportHeight;
      const visibleTop = Math.max(top, viewportTop);
      const visibleBottom = Math.min(sectionBottom, viewportBottom);
      const visibleFraction = Math.max(0, visibleBottom - visibleTop) / h;

      if (visibleFraction >= inThreshold) {
        setIsVisible(true);
      }
    }
  }

  // ── Fade-OUT driven by scroll math ───────────────────────────────────────
  const rel = scrollY - sectionTopRef.current;
  const h = sectionHeightRef.current;

  let fadeOutOpacity = 1;
  let translateY = 0;

  if (h > 0) {
    const outStart = h * fadeOutStart;
    const outEnd = h * fadeOutEnd;
    if (rel > outStart) {
      const progress = Math.min((rel - outStart) / (outEnd - outStart), 1);
      fadeOutOpacity = Math.max(0, 1 - progress);
      translateY = -(progress * translateRange);
    }
  }

  // ── Parallax (clamped) ────────────────────────────────────────────────────
  const maxParallax = h * 0.15;
  const rawParallax = rel * parallaxFactor;
  const clampedParallax = Math.min(Math.max(rawParallax, -maxParallax), maxParallax);

  const fadeOutStyle: React.CSSProperties = {
    opacity: isVisible ? fadeOutOpacity : 0,
    transform: `translate3d(0, ${translateY}px, 0)`,
    willChange: "opacity, transform",
  };

  const parallaxStyle: React.CSSProperties =
    parallaxFactor !== 0
      ? {
          transform: `translate3d(0, ${clampedParallax}px, 0)`,
          willChange: "transform",
        }
      : {};

  return { sectionRef, isVisible, fadeOutStyle, parallaxStyle };
}
