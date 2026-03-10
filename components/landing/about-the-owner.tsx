"use client";

import Image from "next/image";
import SectionHeading from "../landing/section-heading";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

interface AboutTheOwnerProps {
  scrollY: number;
  viewportHeight: number;
}

/**
 * "About the Owner" section with parallax scroll-fade.
 *
 * Visual behaviour:
 *  - A background image sits behind the section with parallax offset.
 *  - Content fades in when entering viewport, fades out when scrolling past.
 *  - Portrait image uses focus effect (scale/opacity based on viewport center distance).
 *  - A semi-opaque overlay blends the background to ensure text readability.
 */
export default function AboutTheOwner({ scrollY, viewportHeight }: AboutTheOwnerProps) {
  const {
    ref,
    contentOpacity,
    contentTranslateY,
    bgParallax,
    imageScale,
    imageOpacity,
    isInViewport,
  } = useViewportAnimation(scrollY, viewportHeight, {
    bgParallaxSpeed: 0.25,
    fadeInEnabled: true,
    fadeOutEnabled: true,
    fadeInDistance: 220,
    fadeOutStart: 0.3,
    fadeOutEnd: 0.8,
    imageScaleEnabled: true,
    imageScaleMin: 0.9,
    imageOpacityMin: 0.45,
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="photo-section relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Parallax background image */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${bgParallax}px, 0)`,
        }}
      >
        <Image
          src="/landing/hero-background.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          priority
          className="absolute inset-0 object-cover object-center saturate-[0.8] contrast-[1.05]"
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
        {/* Extra mobile/tablet overlay for text legibility -- fades out on lg+ */}
        <div className="absolute inset-0 bg-black/50 lg:bg-black/0 transition-colors duration-300" />
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
              <SectionHeading title="Meet the Owner" variant="gradient" align="left" />

              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-100)" }}
              >
                {`I'm a professional hairstylist and salon owner with years of experience, and I truly love what I do. I've been lucky to build an amazing, loyal client base over the years, which means a lot to me.`}
              </p>

              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-200)" }}
              >
                {`I'm friendly, easy to chat with, and I love creating a relaxed, welcoming vibe in my salon. Hair isn't just my job — it's my passion. My goal is always to bring out your natural beauty, match your personal style, and make sure you leave feeling confident and happy.`}
              </p>
            </div>

            {/* Portrait image with focus effect */}
            <div
              className="relative aspect-[3/4] max-w-[400px] overflow-hidden rounded-lg shadow-xl md:order-1 will-change-transform"
              style={{
                opacity: imageOpacity,
                transform: `scale(${imageScale})`,
                transition: isInViewport ? "none" : "opacity 0.3s, transform 0.3s",
              }}
            >
              <Image
                src="/landing/magda.jpg"
                alt="Portrait of the owner of Infinity MK salon"
                width={400}
                height={533}
                quality={75}
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
