"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Lightweight scroll-progress hook that reads native browser scroll position.
 * Returns a 0–1 progress value suitable for the ScrollIndicator component.
 * Automatically adapts when content height changes (e.g. after filtering).
 */
export function useNativeScrollProgress() {
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(0);
    const pendingRef = useRef(false);

    const update = useCallback(() => {
        const scrollY = window.scrollY;
        const limit =
            document.documentElement.scrollHeight - window.innerHeight;
        const p = limit > 0 ? Math.min(Math.max(scrollY / limit, 0), 1) : 0;
        setProgress(Number.isFinite(p) ? p : 0);
        pendingRef.current = false;
    }, []);

    const scheduleUpdate = useCallback(() => {
        if (!pendingRef.current) {
            pendingRef.current = true;
            rafRef.current = requestAnimationFrame(update);
        }
    }, [update]);

    useEffect(() => {
        // Initial measurement
        update();

        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        // React to dynamic content-height changes (e.g. product filtering)
        const ro = new ResizeObserver(scheduleUpdate);
        ro.observe(document.body);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            ro.disconnect();
        };
    }, [update, scheduleUpdate]);

    return { progress };
}
