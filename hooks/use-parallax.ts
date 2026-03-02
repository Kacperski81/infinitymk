"use client";

import { useRef, useMemo } from "react";

/**
 * Configuration options for the useParallax hook.
 * All speed values are multipliers: 0.1 = 10% of scroll speed, 0.5 = 50%, etc.
 */
export interface ParallaxOptions {
    /** Background layer parallax multiplier (default: 0.15) */
    bgSpeed?: number;
    /** Content layer parallax multiplier (default: 0.06) */
    contentSpeed?: number;
    /** Pixels scrolled before fade begins (default: 0 = immediate) */
    fadeStart?: number;
    /** Pixels over which opacity transitions 1→0 (default: 0 = no fade) */
    fadeDistance?: number;
    /** Scale factor applied during scroll (default: 1 = no scale) */
    scaleStart?: number;
    /** Final scale at fadeEnd (default: 1) */
    scaleEnd?: number;
    /** Direction of parallax: 'up' | 'down' (default: 'up') */
    direction?: 'up' | 'down';
    /** Enable eased interpolation for smoother feel (default: false) */
    eased?: boolean;
    /** Clamp parallax to prevent over-travel (default: true) */
    clampParallax?: boolean;
    /** Maximum parallax offset in pixels (default: element height * 0.3) */
    maxParallax?: number;
}

export interface ParallaxResult {
    ref: React.RefObject<HTMLElement | null>;
    /** Offset in px to apply to the background layer */
    bgParallax: number;
    /** Offset in px to apply to the content layer (subtler) */
    contentParallax: number;
    /** 0→1 fade-out as the section scrolls away */
    opacity: number;
    /** Scale transform value based on scroll progress */
    scale: number;
    /** CSS transform string for background: includes translate and optional scale */
    bgStyle: React.CSSProperties;
    /** CSS transform string for content layer */
    contentStyle: React.CSSProperties;
    /** Current scroll progress through this section (0 = top visible, 1 = fully scrolled past) */
    progress: number;
    /** Whether the section is currently in the viewport */
    isInView: boolean;
}

/**
 * Easing function for smoother parallax transitions.
 * Uses ease-out-cubic for natural deceleration.
 */
function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

/**
 * Computes section-local parallax values with enhanced customization.
 *
 * Uses the element's offsetTop so the effect starts at 0 when
 * the section first enters the viewport — no matter how far
 * down the page it sits.
 *
 * @example
 * // Basic usage
 * const { ref, bgParallax, opacity } = useParallax(scrollY);
 * 
 * @example
 * // Hero section with dramatic parallax and fade
 * const hero = useParallax(scrollY, {
 *   bgSpeed: 0.25,
 *   contentSpeed: 0.08,
 *   fadeStart: 100,
 *   fadeDistance: 400,
 *   scaleStart: 1,
 *   scaleEnd: 1.05
 * });
 * 
 * @example
 * // Subtle content section parallax
 * const content = useParallax(scrollY, {
 *   bgSpeed: 0.08,
 *   contentSpeed: 0.02,
 *   eased: true
 * });
 *
 * @param scrollY – global virtual scroll position (px) from useSmoothScroll
 * @param options – configuration options for parallax behavior
 */
export function useParallax(
    scrollY: number,
    options: ParallaxOptions = {}
): ParallaxResult {
    const {
        bgSpeed = 0.15,
        contentSpeed = 0.06,
        fadeStart = 0,
        fadeDistance = 0,
        scaleStart = 1,
        scaleEnd = 1,
        direction = 'up',
        eased = false,
        clampParallax = true,
        maxParallax,
    } = options;

    const ref = useRef<HTMLElement>(null);

    return useMemo(() => {
        const el = ref.current;
        if (!el) {
            return {
                ref,
                bgParallax: 0,
                contentParallax: 0,
                opacity: 1,
                scale: scaleStart,
                bgStyle: {},
                contentStyle: {},
                progress: 0,
                isInView: false,
            };
        }

        const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
        const elHeight = el.offsetHeight;
        const elTop = el.offsetTop;

        // How far the section's top has scrolled past the viewport top.
        // Negative = section is still below the fold.
        const relativeScroll = scrollY - elTop;

        // Calculate progress through the section (0 = entering, 1 = fully exited)
        const totalScrollDistance = elHeight + viewportHeight;
        const adjustedScroll = relativeScroll + viewportHeight;
        const progress = Math.max(0, Math.min(1, adjustedScroll / totalScrollDistance));

        // Check if element is in viewport
        const sectionBottom = elTop + elHeight;
        const viewportTop = scrollY;
        const viewportBottom = scrollY + viewportHeight;
        const isInView = sectionBottom > viewportTop && elTop < viewportBottom;

        // Only apply parallax once the section is on screen
        const clamped = Math.max(0, relativeScroll);
        
        // Apply easing if enabled
        const easedProgress = eased ? easeOutCubic(progress) : progress;
        const scrollMultiplier = eased ? easedProgress * clamped : clamped;

        // Calculate raw parallax values
        let rawBgParallax = scrollMultiplier * bgSpeed;
        let rawContentParallax = scrollMultiplier * contentSpeed;

        // Apply direction
        if (direction === 'down') {
            rawBgParallax = -rawBgParallax;
            rawContentParallax = -rawContentParallax;
        }

        // Clamp parallax to prevent over-travel
        const effectiveMaxParallax = maxParallax ?? elHeight * 0.3;
        const bgParallax = clampParallax
            ? Math.max(-effectiveMaxParallax, Math.min(effectiveMaxParallax, rawBgParallax))
            : rawBgParallax;
        const contentParallax = clampParallax
            ? Math.max(-effectiveMaxParallax * 0.5, Math.min(effectiveMaxParallax * 0.5, rawContentParallax))
            : rawContentParallax;

        // Fade: stays at 1 until `fadeStart`, then drops to 0 over `fadeDistance`
        let opacity = 1;
        if (fadeDistance > 0 && clamped > fadeStart) {
            const fadeProgress = (clamped - fadeStart) / fadeDistance;
            // Apply easing to fade for smoother transition
            opacity = Math.max(0, Math.min(1, 1 - (eased ? easeOutCubic(fadeProgress) : fadeProgress)));
        }

        // Calculate scale based on scroll progress
        const scaleDiff = scaleEnd - scaleStart;
        const scaleProgress = fadeDistance > 0 ? Math.min(1, clamped / (fadeStart + fadeDistance)) : 0;
        const scale = scaleStart + scaleDiff * scaleProgress;

        // Pre-computed CSS styles for direct application
        const bgStyle: React.CSSProperties = {
            transform: `translate3d(0, ${bgParallax}px, 0)${scale !== 1 ? ` scale(${scale})` : ''}`,
            willChange: isInView ? 'transform' : 'auto',
        };

        const contentStyle: React.CSSProperties = {
            transform: `translate3d(0, ${contentParallax}px, 0)`,
            opacity,
            willChange: isInView ? 'transform, opacity' : 'auto',
        };

        return {
            ref,
            bgParallax,
            contentParallax,
            opacity,
            scale,
            bgStyle,
            contentStyle,
            progress,
            isInView,
        };
    }, [scrollY, bgSpeed, contentSpeed, fadeStart, fadeDistance, scaleStart, scaleEnd, direction, eased, clampParallax, maxParallax]);
}

/**
 * Preset configurations for common parallax effects.
 * Import and spread into useParallax options.
 */
export const PARALLAX_PRESETS = {
    /** Hero section: dramatic background, quick fade */
    hero: {
        bgSpeed: 0.25,
        contentSpeed: 0.08,
        fadeStart: 100,
        fadeDistance: 400,
        scaleStart: 1,
        scaleEnd: 1.02,
    } as ParallaxOptions,
    
    /** Subtle content section parallax */
    subtle: {
        bgSpeed: 0.08,
        contentSpeed: 0.02,
        eased: true,
    } as ParallaxOptions,
    
    /** Medium parallax with fade */
    medium: {
        bgSpeed: 0.12,
        contentSpeed: 0.04,
        fadeStart: 200,
        fadeDistance: 400,
    } as ParallaxOptions,
    
    /** Reverse parallax (content moves down) */
    reverse: {
        bgSpeed: 0.15,
        contentSpeed: 0.06,
        direction: 'down' as const,
    } as ParallaxOptions,
    
    /** No parallax, just fade */
    fadeOnly: {
        bgSpeed: 0,
        contentSpeed: 0,
        fadeStart: 0,
        fadeDistance: 300,
    } as ParallaxOptions,
} as const;
