"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/**
 * "About the Owner" section with parallax scroll-fade.
 *
 * Visual behaviour:
 *  - A background image sits behind the section at fixed position (parallax).
 *  - As the user scrolls, the content fades out and translates slightly upward,
 *    mimicking the hero section's scroll-fade pattern.
 *  - A semi-opaque overlay blends the background to ensure text readability.
 */
export default function AboutTheOwner({ scrollY }: { scrollY: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Since we're inside a smooth-scroll wrapper that uses translate3d,
    // the actual "top" in virtual scroll space is the current CSS top + scrollY.
    const top = rect.top + scrollY;
    setSectionTop(top);
    setSectionHeight(rect.height);
  }, [scrollY]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Calculate how far into the section the scroll has gone.
  // Fade begins once section enters and content fades as it scrolls past.
  const relativeScroll = scrollY - sectionTop;
  const fadeStart = sectionHeight * 0.15;
  const fadeEnd = sectionHeight * 0.85;

  let contentOpacity = 1;
  let contentTranslateY = 0;

  if (relativeScroll > fadeStart && sectionHeight > 0) {
    const progress = Math.min(
      (relativeScroll - fadeStart) / (fadeEnd - fadeStart),
      1
    );
    contentOpacity = Math.max(0, 1 - progress);
    contentTranslateY = progress * -40;
  }

  // Subtle parallax for the background (moves slower than scroll)
  const parallaxOffset = relativeScroll * 0.25;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
        }}
      >
        <img
          src="/landing/hero-background.jpg"
          alt=""
          className="absolute inset-0 w-full object-cover object-center saturate-[0.8] contrast-[1.05]"
          aria-hidden="true"
        />

        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--main-900) 0%, transparent 15%, transparent 85%, var(--main-450) 100%)",
            opacity: 0.85,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,0,0,0.5), transparent)",
          }}
        />
      </div>

      {/* Content with scroll-fade */}
      <div
        className="relative z-10 w-full py-16 md:py-24 px-6 md:px-12 lg:px-20 will-change-transform"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
        }}
      >
        <div className="max-w-6xl xl:min-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
            {/* Content (text first on mobile, appears right on desktop) */}
            <div className="flex flex-col gap-6 md:order-2">
              <span
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-background-gradient"
                style={{ fontFamily: "var(--font-aboreto)" }}
              >
                Meet the Owner
              </span>

              <div className="w-16 h-px" style={{ background: "var(--main-200)" }} />

              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-100)" }}
              >
                {`I’m a professional hairstylist and salon owner with years of experience, and I truly love what I do. I’ve been lucky to build an amazing, loyal client base over the years, which means a lot to me.`}
              </p>

              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-200)" }}
              >
                {`I’m friendly, easy to chat with, and I love creating a relaxed, welcoming vibe in my salon. Hair isn’t just my job — it’s my passion. My goal is always to bring out your natural beauty, match your personal style, and make sure you leave feeling confident and happy.`}
              </p>
            </div>

            {/* Portrait image */}
            <div className="relative aspect-[3/4] max-w-[400px] overflow-hidden rounded-lg shadow-xl md:order-1">
              <img
                src="/landing/magda.jpg"
                alt="Portrait of the owner of Infinity MK salon"
                className="object-cover w-full h-full"
              />
              {/* Subtle vignette on the portrait */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 0 80px rgba(0,0,0,0.25)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
