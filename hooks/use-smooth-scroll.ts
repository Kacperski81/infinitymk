"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScrollState } from "@/types";

/**
 * Optimized smooth-scroll engine with frame-rate independent interpolation.
 * 
 * Key optimizations:
 * 1. Delta-time based lerp for consistent motion across refresh rates
 * 2. Exponential decay threshold elimination to prevent snap jumps
 * 3. Debounced ResizeObserver to prevent mid-scroll limit changes
 * 4. Momentum-based touch handling for natural mobile feel
 * 5. Throttled state updates to reduce React reconciliation overhead
 * 
 * @param lerp - Interpolation factor (0.06-0.12 recommended). Higher = faster catch-up
 * @param options - Additional configuration options
 */
export interface SmoothScrollOptions {
  /** Minimum threshold before snap to target (default: 0.05) */
  snapThreshold?: number;
  /** State update interval in ms (default: 16 for ~60fps) */
  stateUpdateInterval?: number;
  /** Touch velocity multiplier (default: 1.5) */
  touchMultiplier?: number;
  /** Enable momentum scrolling on touch (default: true) */
  enableMomentum?: boolean;
  /** Momentum decay factor (default: 0.95) */
  momentumDecay?: number;
}

export function useSmoothScroll(
  lerp = 0.08,
  options: SmoothScrollOptions = {}
) {
  const {
    snapThreshold = 0.05,
    stateUpdateInterval = 16,
    touchMultiplier = 1.5,
    enableMomentum = true,
    momentumDecay = 0.95,
  } = options;

  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const limitRef = useRef(0);
  
  // Frame-rate independence
  const lastTimeRef = useRef(performance.now());
  const lastStateUpdateRef = useRef(0);
  
  // Momentum tracking for touch
  const velocityRef = useRef(0);
  const lastTouchTimeRef = useRef(0);
  const isTouchActiveRef = useRef(false);
  
  // Debounced limit update
  const limitUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const pendingLimitRef = useRef(0);

  const [scrollState, setScrollState] = useState<ScrollState>({
    current: 0,
    target: 0,
    progress: 0,
    limit: 0,
  });

  // Expose refs for high-frequency consumers (avoids React re-renders)
  const scrollYRef = useRef(0);

  const clamp = useCallback(
    (v: number, min: number, max: number) => Math.min(Math.max(v, min), max),
    []
  );

  // Debounced limit update to prevent jumps during dynamic content changes
  const updateLimit = useCallback(() => {
    if (!contentRef.current) return;
    const h = contentRef.current.scrollHeight;
    const vp = window.innerHeight;
    const newLimit = Math.max(0, h - vp);
    
    // If limit changed significantly during scroll, interpolate smoothly
    const currentLimit = limitRef.current;
    const limitDiff = Math.abs(newLimit - currentLimit);
    
    if (limitDiff > 100 && currentRef.current > 0) {
      // Large change during active scroll - debounce and interpolate
      pendingLimitRef.current = newLimit;
      
      if (limitUpdateTimeoutRef.current) {
        clearTimeout(limitUpdateTimeoutRef.current);
      }
      
      limitUpdateTimeoutRef.current = setTimeout(() => {
        // Smoothly interpolate to new limit over several frames
        const interpolateLimit = () => {
          const diff = pendingLimitRef.current - limitRef.current;
          if (Math.abs(diff) > 1) {
            limitRef.current += diff * 0.15;
            requestAnimationFrame(interpolateLimit);
          } else {
            limitRef.current = pendingLimitRef.current;
          }
        };
        interpolateLimit();
      }, 50);
    } else {
      // Small change or not scrolling - update immediately
      limitRef.current = newLimit;
    }
  }, []);

  const animate = useCallback((timestamp: number) => {
    // Calculate delta time for frame-rate independence
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;
    
    // Normalized lerp factor: consistent across 60Hz, 120Hz, 144Hz displays
    // Formula: 1 - (1 - lerp)^(deltaTime / 16.67)
    const normalizedLerp = 1 - Math.pow(1 - lerp, deltaTime / 16.67);
    
    // Apply momentum decay when touch is not active
    if (enableMomentum && !isTouchActiveRef.current && Math.abs(velocityRef.current) > 0.5) {
      velocityRef.current *= momentumDecay;
      targetRef.current = clamp(
        targetRef.current + velocityRef.current,
        0,
        limitRef.current
      );
      
      // Stop momentum when velocity is negligible
      if (Math.abs(velocityRef.current) < 0.5) {
        velocityRef.current = 0;
      }
    }
    
    const t = targetRef.current;
    const c = currentRef.current;
    const diff = t - c;

    // Exponential decay without hard snap threshold
    // This eliminates the visible "jump" at the end of scroll
    if (Math.abs(diff) > snapThreshold) {
      currentRef.current = c + diff * normalizedLerp;
    }
    // No else clause - let it naturally converge without snapping

    const limit = limitRef.current;
    const progress = limit > 0 ? clamp(currentRef.current / limit, 0, 1) : 0;

    // Update ref for high-frequency consumers
    scrollYRef.current = currentRef.current;

    // Apply transform using translate3d for GPU acceleration
    if (contentRef.current) {
      // Use will-change sparingly - it's already in CSS
      contentRef.current.style.transform = `translate3d(0, ${-currentRef.current}px, 0)`;
    }

    // Throttled state updates to reduce React reconciliation
    const now = performance.now();
    if (now - lastStateUpdateRef.current >= stateUpdateInterval) {
      setScrollState({
        current: currentRef.current,
        target: t,
        progress: Number.isFinite(progress) ? progress : 0,
        limit,
      });
      lastStateUpdateRef.current = now;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [lerp, clamp, snapThreshold, stateUpdateInterval, enableMomentum, momentumDecay]);

  /**
   * Walk up from the event target to find a scrollable ancestor
   * (one with overflow-y auto/scroll and actual overflow).
   * Returns null if no scrollable container is found before `contentRef`.
   */
  const findScrollableAncestor = useCallback(
    (target: EventTarget | null): HTMLElement | null => {
      let el = target as HTMLElement | null;
      while (el && el !== contentRef.current) {
        const { overflowY } = getComputedStyle(el);
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight
        ) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    },
    []
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (lerp <= 0) {
        e.preventDefault();
        return; // scroll locked during intro
      }

      // Check if the event is inside a natively scrollable child
      const scrollable = findScrollableAncestor(e.target);
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop = scrollTop <= 0 && e.deltaY < 0;
        const atBottom =
          scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

        // Let native scroll handle it unless the child has hit its limit
        if (!atTop && !atBottom) return;
      }

      e.preventDefault();
      targetRef.current = clamp(
        targetRef.current + e.deltaY,
        0,
        limitRef.current
      );
    },
    [clamp, lerp, findScrollableAncestor]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lerp <= 0) return; // scroll locked during intro
      const step = window.innerHeight * 0.3;
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          targetRef.current = clamp(
            targetRef.current + step,
            0,
            limitRef.current
          );
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          targetRef.current = clamp(
            targetRef.current - step,
            0,
            limitRef.current
          );
          break;
        case "Home":
          e.preventDefault();
          targetRef.current = 0;
          break;
        case "End":
          e.preventDefault();
          targetRef.current = limitRef.current;
          break;
      }
    },
    [clamp, lerp]
  );

  const touchYRef = useRef(0);
  
  const onTouchStart = useCallback((e: TouchEvent) => {
    touchYRef.current = e.touches[0].clientY;
    lastTouchTimeRef.current = performance.now();
    isTouchActiveRef.current = true;
    // Reset velocity on new touch to prevent momentum from previous gesture
    velocityRef.current = 0;
  }, []);
  
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (lerp <= 0) {
        e.preventDefault();
        return; // scroll locked during intro
      }

      const now = performance.now();
      const timeDelta = Math.max(now - lastTouchTimeRef.current, 8); // Prevent division by tiny values
      const delta = touchYRef.current - e.touches[0].clientY;
      
      // Calculate velocity for momentum scrolling
      // Velocity = pixels per 16.67ms (normalized to 60fps frame)
      velocityRef.current = (delta / timeDelta) * 16.67 * touchMultiplier;
      
      touchYRef.current = e.touches[0].clientY;
      lastTouchTimeRef.current = now;

      // Check if the event is inside a natively scrollable child
      const scrollable = findScrollableAncestor(e.target);
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop = scrollTop <= 0 && delta < 0;
        const atBottom =
          scrollTop + clientHeight >= scrollHeight - 1 && delta > 0;

        if (!atTop && !atBottom) return;
      }

      e.preventDefault();
      // Use velocity-based update for smoother touch feel
      targetRef.current = clamp(
        targetRef.current + velocityRef.current,
        0,
        limitRef.current
      );
    },
    [clamp, lerp, findScrollableAncestor, touchMultiplier]
  );
  
  const onTouchEnd = useCallback(() => {
    isTouchActiveRef.current = false;
    // Velocity is preserved for momentum - it will be applied in animate()
  }, []);

  useEffect(() => {
    updateLimit();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", updateLimit);

    rafRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => updateLimit());
    if (contentRef.current) ro.observe(contentRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", updateLimit);
      ro.disconnect();
      
      // Clean up debounce timeout
      if (limitUpdateTimeoutRef.current) {
        clearTimeout(limitUpdateTimeoutRef.current);
      }
    };
  }, [animate, onWheel, onKeyDown, onTouchStart, onTouchMove, onTouchEnd, updateLimit]);

  // Return scrollYRef for high-frequency consumers that need immediate values
  return { contentRef, scrollState, scrollYRef };
}
