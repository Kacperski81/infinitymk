"use client";

import { useRef, useEffect, useCallback } from "react";

export interface TopEdgeFadeOptions {
  /** Distance (px) from viewport top where fade begins (default 150). */
  fadeStart?: number;
  /** Distance (px) from viewport top where element is fully transparent (default 30). */
  fadeEnd?: number;
  /** Max upward translate in px applied at full fade (default 12). */
  translateMax?: number;
}

/**
 * Per-element fade-out as elements scroll toward the top edge of the
 * viewport — i.e. behind the fixed logo / frame area.
 *
 * Works inside a transform-based smooth-scroll system by using the virtual
 * `scrollY` and measuring element offsets via `offsetTop` (immune to
 * ancestor CSS transforms).
 *
 * @example
 * ```tsx
 * const topFade = useTopEdgeFade(scrollY);
 *
 * <h2 ref={topFade.ref("heading")} style={topFade.style("heading")}>…</h2>
 * <p  ref={topFade.ref("body")}    style={topFade.style("body")}>…</p>
 * ```
 */
export function useTopEdgeFade(
  scrollY: number,
  options: TopEdgeFadeOptions = {}
) {
  const { fadeStart = 100, fadeEnd = 5, translateMax = 12 } = options;

  /** Measured absolute offset (from scroll-wrapper top) for each key. */
  const offsetMap = useRef(new Map<string, number>());
  /** DOM element for each key — kept for resize remeasurement. */
  const elementMap = useRef(new Map<string, HTMLElement>());
  /** Stable ref-callback cache so React doesn't re-invoke on every render. */
  const callbackCache = useRef(
    new Map<string, (el: HTMLElement | null) => void>()
  );

  /** Walk offsetParent chain to get absolute offset within scroll wrapper. */
  const measureElement = useCallback((key: string, el: HTMLElement) => {
    let top = 0;
    let current: HTMLElement | null = el;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }
    offsetMap.current.set(key, top);
  }, []);

  /** Returns a stable ref callback for the given key. */
  const ref = useCallback(
    (key: string) => {
      if (!callbackCache.current.has(key)) {
        callbackCache.current.set(key, (el: HTMLElement | null) => {
          if (el) {
            elementMap.current.set(key, el);
            measureElement(key, el);
          }
        });
      }
      return callbackCache.current.get(key)!;
    },
    [measureElement]
  );

  /** Remeasure all tracked elements on layout changes. */
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      for (const [key, el] of elementMap.current) {
        measureElement(key, el);
      }
    });
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [measureElement]);

  /**
   * Returns inline styles for the given key.
   *
   * - Element far from top → returns `{}` (no override, CSS handles state).
   * - Element in fade zone → returns interpolated opacity + upward shift,
   *   with `transition: "none"` so scroll drives the change frame-by-frame.
   * - Element above fade zone → fully transparent.
   */
  const style = (key: string): React.CSSProperties => {
    const offset = offsetMap.current.get(key);
    if (offset === undefined) return {};

    const dist = offset - scrollY;

    // Below the fade zone — no override.
    if (dist >= fadeStart) return {};

    // Above the fade zone — fully hidden.
    if (dist <= fadeEnd) {
      return {
        opacity: 0,
        transform: `translate3d(0, -${translateMax}px, 0)`,
        transition: "none",
      };
    }

    // Inside the fade zone — interpolate.
    const t = (dist - fadeEnd) / (fadeStart - fadeEnd);
    return {
      opacity: t,
      transform: `translate3d(0, ${(1 - t) * -translateMax}px, 0)`,
      transition: "none",
    };
  };

  return { ref, style };
}
