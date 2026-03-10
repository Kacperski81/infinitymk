"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface LoadingOverlayProps {
  isContentReady: boolean;
  onComplete: () => void;
  onExitStart?: () => void;
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const SESSION_KEY = "loading-overlay-seen";

function hasSeenThisSession() {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage full or unavailable
  }
}

export function LoadingOverlay({
  isContentReady,
  onComplete,
  onExitStart,
}: LoadingOverlayProps) {
  // Always initialise to server-safe defaults (false / "counting" / 2400)
  // so the first render matches the SSR output. After mount, a useEffect
  // checks client-only APIs and updates state, avoiding hydration mismatch.
  const [shouldSkip, setShouldSkip] = useState(false);

  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<
    "counting" | "completing" | "exiting" | "done"
  >("counting");
  const rafRef = useRef<number>(0);
  const startRef = useRef(0);

  const [minDuration, setMinDuration] = useState(2400);

  // Client-only check — runs after hydration, no SSR/CSR mismatch
  useEffect(() => {
    const skip = prefersReducedMotion() || hasSeenThisSession();
    setShouldSkip(skip);
    if (!skip) setMinDuration(isMobile() ? 1200 : 2400);
  }, []);

  // If skipping, fire onComplete immediately
  useEffect(() => {
    if (shouldSkip) {
      markSeen();
      onComplete();
    }
  }, [shouldSkip, onComplete]);

  // Phase 1: Counting 0 -> 90
  const animateCounting = useCallback(
    (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const linear = Math.min(elapsed / minDuration, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      setCount(Math.round(eased * 90));

      if (linear < 1) {
        rafRef.current = requestAnimationFrame(animateCounting);
      }
    },
    [minDuration]
  );

  useEffect(() => {
    if (phase === "counting") {
      rafRef.current = requestAnimationFrame(animateCounting);
      return () => cancelAnimationFrame(rafRef.current);
    }
  }, [phase, animateCounting]);

  // Transition: counting -> completing
  useEffect(() => {
    if (phase === "counting" && count >= 90 && isContentReady) {
      setPhase("completing");
    }
  }, [phase, count, isContentReady]);

  // Phase 2: Completing 90 -> 100
  useEffect(() => {
    if (phase !== "completing") return;

    const completeDuration = 300;
    let start: number | null = null;
    const baseCount = count;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / completeDuration, 1);
      const eased = 1 - Math.pow(1 - t, 2);
      setCount(Math.round(baseCount + (100 - baseCount) * eased));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("exiting");
        onExitStart?.();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, onExitStart]);

  // Exit transition end
  const handleTransitionEnd = useCallback(() => {
    if (phase === "exiting") {
      markSeen();
      setPhase("done");
      onComplete();
    }
  }, [phase, onComplete]);

  // Tap to skip (mobile)
  const handleTap = useCallback(() => {
    if (phase === "counting" || phase === "completing") {
      cancelAnimationFrame(rafRef.current);
      setCount(100);
      setPhase("exiting");
      onExitStart?.();
    }
  }, [phase, onExitStart]);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";
  const exitDuration = isMobile() ? 0.7 : 1;
  const contentFadeDuration = 0.3; // Content fades out first
  const splitDelay = contentFadeDuration; // Split starts after content fades

  return (
    <div
      className="fixed inset-0 z-[60]"
      onClick={handleTap}
      role="progressbar"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading experience"
      aria-live="polite"
    >
      {/* Top half - moves up on exit */}
      <div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          backgroundColor: "var(--main-900)",
          transform: isExiting ? "translateY(-100%)" : "translateY(0)",
          opacity: isExiting ? 0 : 1,
          transition: isExiting
            ? `transform ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${splitDelay}s, opacity ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${splitDelay}s`
            : "none",
        }}
      >
        {/* Radial glow - top half */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 100%, var(--main-700), transparent)",
          }}
        />
      </div>

      {/* Bottom half - moves down on exit */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundColor: "var(--main-900)",
          transform: isExiting ? "translateY(100%)" : "translateY(0)",
          opacity: isExiting ? 0 : 1,
          transition: isExiting
            ? `transform ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${splitDelay}s, opacity ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${splitDelay}s`
            : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Radial glow - bottom half */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 0%, var(--main-700), transparent)",
          }}
        />
      </div>

      {/* Content — centered, fades out first before split */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: isExiting ? 0 : 1,
          transition: isExiting
            ? `opacity ${contentFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1)`
            : "none",
        }}
      >
        <div className="relative flex flex-col items-center gap-6 md:gap-10 mt-12 md:mt-16">
          
          {/* Counter */}
          {/* <div className="relative flex items-baseline gap-1 tabular-nums">
            <span
              className="text-6xl font-light tracking-tighter md:text-8xl"
              style={{ color: "var(--main-50)" }}
            >
              {count}
            </span>
            <span
              className="text-lg font-light md:text-2xl"
              style={{ color: "var(--main-200)" }}
            >
              {"%"}
            </span>
          </div> */}

          {/* Progress bar */}
          <div className="relative h-px w-36 overflow-hidden md:w-56">
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "var(--main-700)" }}
            />
            <div
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                backgroundColor: "var(--main-200)",
                width: `${count}%`,
                transition: "width 0.1s ease-out",
              }}
            />
            {/* Shimmer effect on progress bar */}
            <div
              className="absolute inset-y-0 w-12 opacity-40"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--main-100), transparent)",
                animation: "loading-bar-shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>

          {/* Label */}
          {/* <p
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ color: "var(--main-400)" }}
          >
            {phase === "counting" && !isContentReady
              ? "Loading assets"
              : phase === "counting" && isContentReady
                ? "Preparing experience"
                : "Launching"}
          </p> */}

          {/* Tap-to-skip hint -- mobile only */}
          <p
            className="mt-4 text-[10px] uppercase tracking-[0.25em] md:hidden"
            style={{ color: "var(--main-600)" }}
          >
            Tap to skip
          </p>
        </div>
      </div>

      {/* Corner accents -- move and fade independently */}
      {/* Top-left corner - moves up while fading */}
      <div
        className="absolute left-8 top-6 hidden h-6 w-6 border-l border-t md:block"
        style={{
          borderColor: "var(--main-600)",
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "translateY(-20px)" : "translateY(0)",
          transition: isExiting
            ? `opacity ${contentFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1), transform ${contentFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1)`
            : "none",
        }}
      />
      {/* Bottom-right corner - moves down while fading */}
      <div
        className="absolute bottom-6 right-8 hidden h-6 w-6 border-b border-r md:block"
        style={{
          borderColor: "var(--main-600)",
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "translateY(20px)" : "translateY(0)",
          transition: isExiting
            ? `opacity ${contentFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1), transform ${contentFadeDuration}s cubic-bezier(0.32, 0.72, 0, 1)`
            : "none",
        }}
      />
    </div>
  );
}
