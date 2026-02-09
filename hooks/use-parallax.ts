"use client";

import { useRef, useMemo } from "react";

interface ParallaxResult {
    ref: React.RefObject<HTMLElement | null>;
    /** Offset in px to apply to the background layer */
    bgParallax: number;
    /** Offset in px to apply to the content layer (subtler) */
    contentParallax: number;
    /** 0→1 fade-out as the section scrolls away */
    opacity: number;
}

/**
 * Computes section-local parallax values.
 *
 * Uses the element's offsetTop so the effect starts at 0 when
 * the section first enters the viewport — no matter how far
 * down the page it sits.
 *
 * @param scrollY      – global virtual scroll position (px) from useSmoothScroll
 * @param bgSpeed      – background parallax multiplier  (default 0.15)
 * @param contentSpeed – content parallax multiplier      (default 0.06)
 * @param fadeStart    – px of relative scroll before fading begins (0 = fade immediately)
 * @param fadeDistance  – px of scroll over which opacity goes from 1→0 (0 = no fade)
 */
export function useParallax(
    scrollY: number,
    bgSpeed = 0.15,
    contentSpeed = 0.06,
    fadeStart = 0,
    fadeDistance = 0
): ParallaxResult {
    const ref = useRef<HTMLElement>(null);

    return useMemo(() => {
        const el = ref.current;
        if (!el) {
            return { ref, bgParallax: 0, contentParallax: 0, opacity: 1 };
        }

        // How far the section's top has scrolled past the viewport top.
        // Negative = section is still below the fold.
        const relativeScroll = scrollY - el.offsetTop;

        // Only apply parallax once the section is on screen
        const clamped = Math.max(0, relativeScroll);

        const bgParallax = clamped * bgSpeed;
        const contentParallax = clamped * contentSpeed;

        // Fade: stays at 1 until `fadeStart`, then drops to 0 over `fadeDistance`
        let opacity = 1;
        if (fadeDistance > 0 && clamped > fadeStart) {
            opacity = Math.max(0, Math.min(1, 1 - (clamped - fadeStart) / fadeDistance));
        }

        return { ref, bgParallax, contentParallax, opacity };
    }, [scrollY, bgSpeed, contentSpeed, fadeStart, fadeDistance]);
}
