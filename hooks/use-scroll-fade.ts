"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export interface ScrollFadeOptions {
  /**
   * IntersectionObserver threshold that triggers the fade-IN.
   * 0.15 = element is 15 % visible before entrance fires (default).
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
  /** True once the section has crossed the IntersectionObserver threshold. */
  isVisible: boolean;
  /** Fade-out + translate style driven by scroll position. */
  fadeOutStyle: React.CSSProperties;
  /** Parallax translateY style for a background layer. */
  parallaxStyle: React.CSSProperties;
}

/**
 * Scroll-fade + optional parallax hook — v2.
 *
 * Entry detection uses IntersectionObserver (accurate, no scroll-math drift).
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
    sectionTopRef.current = el.getBoundingClientRect().top + window.scrollY;
    sectionHeightRef.current = el.offsetHeight;
  }, []); // stable — no scrollY dep

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);

    // IntersectionObserver handles fade-IN trigger
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          io.disconnect(); // fire once
        }
      },
      { threshold: inThreshold }
    );
    if (sectionRef.current) io.observe(sectionRef.current);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [measure, inThreshold]);

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
