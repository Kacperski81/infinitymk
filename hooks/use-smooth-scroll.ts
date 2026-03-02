"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScrollState } from "@/types";

/**
 * Smooth-scroll engine — virtual scroll via translate3d.
 *
 * Native browser scroll is fully suppressed (preventDefault on wheel / touch).
 * The engine keeps two values:
 *   targetRef  – where the user *wants* to be (set immediately on input)
 *   currentRef – where the content *is*  (lerps toward target each rAF tick)
 *
 * The transform `translate3d(0, -currentRef, 0)` is written directly on the
 * wrapper element in the rAF callback — never via React state — so there is
 * zero React overhead on the hot path.
 *
 * React state (`scrollState`) is updated on a throttled interval so that
 * consumers (parallax, scroll-fade, etc.) read a stable value without
 * triggering excessive reconciliation.
 *
 * === Key design decisions ===
 *
 * 1. Frame-rate–independent lerp
 *    `normalizedLerp = 1 − (1 − lerp)^(Δt / 16.67)`
 *    At 60 Hz Δt ≈ 16.67 ms → factor ≈ lerp      (no change)
 *    At 120 Hz Δt ≈ 8.33 ms → factor ≈ lerp / 2  (half step per frame, same per second)
 *    This eliminates the "springier on high-refresh monitors" artifact.
 *
 * 2. No hard snap threshold
 *    Replacing the old `else { current = target }` branch with pure exponential
 *    decay removes the visible discontinuity that appeared when |diff| < 0.5
 *    and the value was forced to jump to exact target.
 *
 * 3. Safe updateLimit — clamps target immediately
 *    When filtered content becomes shorter, naively debouncing the limit
 *    interpolation caused limitRef to decrement over many frames. Each rAF
 *    tick, `clamp(target, 0, limit)` silently pushed target backward, dragging
 *    the viewport toward zero.  Fix: update limit atomically and clamp both
 *    targetRef and currentRef in the same synchronous call so the rAF loop
 *    always sees a consistent (target ≤ limit) invariant.
 *
 * 4. scrollToVirtual(px)
 *    Sets targetRef directly in the virtual coordinate space. Use this instead
 *    of `window.scrollTo` — native scroll is locked at 0 and window.scrollTo
 *    fights the engine without moving anything visually.
 *
 * 5. Momentum touch
 *    Velocity is tracked per touch-move event, normalised to a 60-fps frame,
 *    then decayed in the rAF loop after touch-end for a natural flick feel.
 */

export interface SmoothScrollOptions {
  /** Convergence threshold in px — below this the lerp step is skipped but
   *  the value is NOT snapped, avoiding the old discontinuity (default 0.05). */
  snapThreshold?: number;
  /** React state update interval in ms (default 16 ≈ 60 fps). */
  stateUpdateInterval?: number;
  /** Touch delta multiplier (default 1.5). */
  touchMultiplier?: number;
  /** Enable post-touch momentum coasting (default true). */
  enableMomentum?: boolean;
  /** Velocity decay per rAF frame during momentum (default 0.95). */
  momentumDecay?: number;
}

export function useSmoothScroll(lerp = 0.08, options: SmoothScrollOptions = {}) {
  const {
    snapThreshold      = 0.05,
    stateUpdateInterval = 16,
    touchMultiplier    = 1.5,
    enableMomentum     = true,
    momentumDecay      = 0.95,
  } = options;

  // ── DOM ref ──────────────────────────────────────────────────────────────
  const contentRef = useRef<HTMLDivElement>(null);

  // ── Virtual scroll state (mutated in rAF — never React state) ───────────
  const targetRef  = useRef(0); // where user wants to be
  const currentRef = useRef(0); // where content currently is
  const limitRef   = useRef(0); // max scrollable distance

  // ── rAF handle ──────────────────────────────────────────────────────────
  const rafRef = useRef<number>(0);

  // ── Frame-rate independence ──────────────────────────────────────────────
  const lastTimeRef = useRef(performance.now());

  // ── Throttled React state ────────────────────────────────────────────────
  const lastStateUpdateRef = useRef(0);
  const [scrollState, setScrollState] = useState<ScrollState>({
    current: 0,
    target:  0,
    progress: 0,
    limit:   0,
  });

  // ── Touch momentum ───────────────────────────────────────────────────────
  const velocityRef        = useRef(0);
  const lastTouchTimeRef   = useRef(0);
  const isTouchActiveRef   = useRef(false);
  const touchYRef          = useRef(0);

  // ── Utilities ────────────────────────────────────────────────────────────
  const clamp = useCallback(
    (v: number, min: number, max: number) => Math.min(Math.max(v, min), max),
    []
  );

  /**
   * Recalculate the maximum scrollable distance and immediately clamp both
   * targetRef and currentRef so neither ever exceeds the new limit.
   *
   * This is the critical fix for the filter-change jump:
   * - Filter changes reduce content height → limit shrinks.
   * - If target > new limit, every subsequent rAF frame would silently move
   *   target backward via clamp(), dragging the viewport toward zero.
   * - By clamping synchronously here the rAF loop always sees target ≤ limit.
   */
  const updateLimit = useCallback(() => {
    if (!contentRef.current) return;
    const newLimit = Math.max(0, contentRef.current.scrollHeight - window.innerHeight);
    limitRef.current   = newLimit;
    targetRef.current  = Math.min(targetRef.current,  newLimit);
    currentRef.current = Math.min(currentRef.current, newLimit);
  }, []);

  /**
   * Programmatic virtual scroll. Use this instead of window.scrollTo —
   * native scroll is locked at 0 and window.scrollTo has no visual effect.
   *
   * @param px Target virtual Y position in pixels (clamped to [0, limit]).
   */
  const scrollToVirtual = useCallback((px: number) => {
    targetRef.current = clamp(px, 0, limitRef.current);
  }, [clamp]);

  // ── rAF loop ─────────────────────────────────────────────────────────────
  const animate = useCallback((timestamp: number) => {
    const deltaTime = timestamp - lastTimeRef.current;
    lastTimeRef.current = timestamp;

    // Frame-rate–independent lerp factor.
    // At 60 Hz: factor ≈ lerp.  At 120 Hz: factor ≈ lerp/2 per frame,
    // giving identical velocity in wall-clock seconds on all monitors.
    const normalizedLerp = 1 - Math.pow(1 - lerp, deltaTime / 16.67);

    // Momentum coasting after touch-end.
    if (enableMomentum && !isTouchActiveRef.current && Math.abs(velocityRef.current) > 0.5) {
      velocityRef.current *= momentumDecay;
      targetRef.current    = clamp(
        targetRef.current + velocityRef.current,
        0,
        limitRef.current
      );
      if (Math.abs(velocityRef.current) < 0.5) velocityRef.current = 0;
    }

    const t    = targetRef.current;
    const c    = currentRef.current;
    const diff = t - c;

    // Pure exponential decay — no hard snap.
    // The removed `else { current = target }` caused a visible discontinuity
    // as the value jumped from near-target to exactly-target each tick.
    if (Math.abs(diff) > snapThreshold) {
      currentRef.current = c + diff * normalizedLerp;
    }

    const limit    = limitRef.current;
    const progress = limit > 0 ? clamp(currentRef.current / limit, 0, 1) : 0;

    // Write transform on the hot path — zero React overhead.
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0,${-currentRef.current}px,0)`;
    }

    // Throttled React state so consumers get updates without excess renders.
    const now = performance.now();
    if (now - lastStateUpdateRef.current >= stateUpdateInterval) {
      setScrollState({
        current:  currentRef.current,
        target:   t,
        progress: Number.isFinite(progress) ? progress : 0,
        limit,
      });
      lastStateUpdateRef.current = now;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [lerp, clamp, snapThreshold, stateUpdateInterval, enableMomentum, momentumDecay]);

  // ── Scrollable-child detection ──────────────────────────────────────────
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

  // ── Input handlers ───────────────────────────────────────────────────────
  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (lerp <= 0) { e.preventDefault(); return; }
      const scrollable = findScrollableAncestor(e.target);
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop    = scrollTop <= 0 && e.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
        if (!atTop && !atBottom) return;
      }
      e.preventDefault();
      targetRef.current = clamp(targetRef.current + e.deltaY, 0, limitRef.current);
    },
    [clamp, lerp, findScrollableAncestor]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lerp <= 0) return;
      const step = window.innerHeight * 0.3;
      switch (e.key) {
        case "ArrowDown": case "PageDown":
          e.preventDefault();
          targetRef.current = clamp(targetRef.current + step, 0, limitRef.current);
          break;
        case "ArrowUp": case "PageUp":
          e.preventDefault();
          targetRef.current = clamp(targetRef.current - step, 0, limitRef.current);
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

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchYRef.current        = e.touches[0].clientY;
    lastTouchTimeRef.current = performance.now();
    isTouchActiveRef.current = true;
    velocityRef.current      = 0;
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (lerp <= 0) { e.preventDefault(); return; }

      const now       = performance.now();
      const timeDelta = Math.max(now - lastTouchTimeRef.current, 8);
      const delta     = touchYRef.current - e.touches[0].clientY;

      // Velocity normalised to a 60-fps frame so momentum decay is consistent
      // regardless of how fast touch-move events fire.
      velocityRef.current      = (delta / timeDelta) * 16.67 * touchMultiplier;
      touchYRef.current        = e.touches[0].clientY;
      lastTouchTimeRef.current = now;

      const scrollable = findScrollableAncestor(e.target);
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const atTop    = scrollTop <= 0 && delta < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && delta > 0;
        if (!atTop && !atBottom) return;
      }

      e.preventDefault();
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
    // Velocity persists and is consumed by the momentum branch in animate().
  }, []);

  // ── Wire up listeners + start rAF ────────────────────────────────────────
  useEffect(() => {
    updateLimit();

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("keydown",    onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true  });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });
    window.addEventListener("touchend",   onTouchEnd,   { passive: true  });
    window.addEventListener("resize",     updateLimit);

    rafRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(updateLimit);
    if (contentRef.current) ro.observe(contentRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("keydown",    onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize",     updateLimit);
      ro.disconnect();
    };
  }, [animate, onWheel, onKeyDown, onTouchStart, onTouchMove, onTouchEnd, updateLimit]);

  return { contentRef, scrollState, scrollToVirtual };
}
