"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ScrollState } from "@/types";

/**
 * Custom smooth-scroll engine.
 * Hijacks native scroll, translates a fixed wrapper via lerped translate3d.
 * Returns current virtual scroll position for child components.
 */
export function useSmoothScroll(lerp = 0.08) {
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const limitRef = useRef(0);

  const [scrollState, setScrollState] = useState<ScrollState>({
    current: 0,
    target: 0,
    progress: 0,
    limit: 0,
  });

  const clamp = useCallback(
    (v: number, min: number, max: number) => Math.min(Math.max(v, min), max),
    []
  );

  const updateLimit = useCallback(() => {
    if (!contentRef.current) return;
    const h = contentRef.current.scrollHeight;
    const vp = window.innerHeight;
    limitRef.current = Math.max(0, h - vp);
  }, []);

  const animate = useCallback(() => {
    const t = targetRef.current;
    const c = currentRef.current;
    const diff = t - c;

    if (Math.abs(diff) > 0.5) {
      currentRef.current = c + diff * lerp;
    } else {
      currentRef.current = t;
    }

    const limit = limitRef.current;
    const progress =
      limit > 0 ? clamp(currentRef.current / limit, 0, 1) : 0;

    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${-currentRef.current}px, 0)`;
    }

    setScrollState({
      current: currentRef.current,
      target: t,
      progress: Number.isFinite(progress) ? progress : 0,
      limit,
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [lerp, clamp]);

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
  }, []);
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (lerp <= 0) {
        e.preventDefault();
        return; // scroll locked during intro
      }

      const delta = touchYRef.current - e.touches[0].clientY;
      touchYRef.current = e.touches[0].clientY;

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
      targetRef.current = clamp(
        targetRef.current + delta * 2,
        0,
        limitRef.current
      );
    },
    [clamp, lerp, findScrollableAncestor]
  );

  useEffect(() => {
    updateLimit();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
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
      window.removeEventListener("resize", updateLimit);
      ro.disconnect();
    };
  }, [animate, onWheel, onKeyDown, onTouchStart, onTouchMove, updateLimit]);

  return { contentRef, scrollState };
}
