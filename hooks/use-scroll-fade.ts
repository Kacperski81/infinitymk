"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface ScrollFadeOptions {
  /** Fraction of section height before fade-in begins (default 0 — starts immediately on entry). */
  fadeInStart?: number;
  /** Fraction of section height where fade-in completes (default 0.25). */
  fadeInEnd?: number;
  /** Fraction of section height where fade-out begins (default 0.6). */
  fadeOutStart?: number;
  /** Fraction of section height where fade-out completes (default 0.95). */
  fadeOutEnd?: number;
  /** Max translateY offset applied during fade-out in px (default 40). */
  translateRange?: number;
  /** Parallax multiplier for a background layer (default 0 = disabled). */
  parallaxFactor?: number;
}

export interface ScrollFadeResult {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  contentStyle: React.CSSProperties;
  parallaxStyle: React.CSSProperties;
}

/**
 * Unified scroll-fade + optional parallax hook.
 *
 * - Fades content IN as the section enters the viewport.
 * - Fades content OUT as the section scrolls past.
 * - Optionally moves a background layer at a different rate (parallax).
 *
 * Uses a ResizeObserver so measurements are always fresh without
 * re-running on every scroll tick.
 */
export function useScrollFade(
  scrollY: number,
  options: ScrollFadeOptions = {}
): ScrollFadeResult {
  const {
    fadeInStart = 0,
    fadeInEnd = 0.2,
    fadeOutStart = 0.65,
    fadeOutEnd = 0.95,
    translateRange = 36,
    parallaxFactor = 0,
  } = options;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [measured, setMeasured] = useState(false);

  // Measure once and re-measure on resize via ResizeObserver.
  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setSectionTop(rect.top + scrollY);
    setSectionHeight(rect.height);
    setMeasured(true);
  }, [scrollY]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [measure]);

  // ── Calculations ──────────────────────────────────────────────────────────
  const rel = scrollY - sectionTop;
  let opacity = measured ? 0 : 1;
  let translateY = 0;

  if (measured && sectionHeight > 0) {
    // Fade IN
    const inStart = sectionHeight * fadeInStart;
    const inEnd = sectionHeight * fadeInEnd;
    if (rel <= inStart) {
      opacity = 0;
    } else if (rel <= inEnd) {
      opacity = (rel - inStart) / (inEnd - inStart);
    } else {
      opacity = 1;
    }

    // Fade OUT (overrides fade-in progress once past fadeOutStart)
    const outStart = sectionHeight * fadeOutStart;
    const outEnd = sectionHeight * fadeOutEnd;
    if (rel > outStart) {
      const progress = Math.min((rel - outStart) / (outEnd - outStart), 1);
      opacity = Math.max(0, 1 - progress);
      translateY = -(progress * translateRange);
    }
  }

  // Parallax offset (clamped so image never over-travels)
  const rawParallax = rel * parallaxFactor;
  const maxParallax = sectionHeight * 0.15;
  const clampedParallax = Math.min(Math.max(rawParallax, -maxParallax), maxParallax);

  const contentStyle: React.CSSProperties = {
    opacity,
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

  return { sectionRef, contentStyle, parallaxStyle };
}
