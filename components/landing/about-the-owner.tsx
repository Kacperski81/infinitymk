"use client";

import Image from "next/image";
import { useScrollFade } from "@/hooks/use-scroll-fade";

/**
 * "About the Owner" section.
 *
 * Parallax intensity is deliberately lighter than the Hero (0.18 vs 0.30)
 * so each section feels distinct while sharing the same depth language.
 * Fade-in fires as soon as the section enters the viewport, fade-out
 * begins at 65 % through to keep content readable longer on slower scrolls.
 */
export default function AboutTheOwner({ scrollY }: { scrollY: number }) {
  const { sectionRef, contentStyle, parallaxStyle } = useScrollFade(scrollY, {
    fadeInStart: 0.0,
    fadeInEnd: 0.18,
    fadeOutStart: 0.65,
    fadeOutEnd: 0.95,
    translateRange: 36,
    parallaxFactor: 0.18,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Parallax background image — moves at 0.18× scroll rate */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={parallaxStyle}
      >
        <Image
          src="/landing/hero-background.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          priority
          className="absolute inset-0 object-cover object-center saturate-[0.75] contrast-[1.08]"
          aria-hidden="true"
        />

        {/* Layered overlays for depth and legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--main-900) 0%, transparent 18%, transparent 82%, var(--main-450) 100%)",
            opacity: 0.88,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 65% at 25% 50%, rgba(0,0,0,0.55), transparent)",
          }}
        />
        {/* Mobile/tablet extra darkening — fades out on large screens */}
        <div className="absolute inset-0 bg-black/45 lg:bg-black/0 transition-colors duration-300" />
      </div>

      {/* Content — fades in on entry, fades out on exit */}
      <div
        className="relative z-10 w-full py-16 md:py-24 px-6 md:px-12 lg:px-20"
        style={contentStyle}
      >
        <div className="max-w-6xl xl:min-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">

            {/* Text — order 2 on desktop so portrait leads */}
            <div className="flex flex-col gap-6 md:order-2">
              <span
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-background-gradient text-balance"
                style={{ fontFamily: "var(--font-aboreto)" }}
              >
                Meet the Owner
              </span>

              <div className="w-16 h-px" style={{ background: "var(--main-200)" }} />

              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light text-pretty"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-100)" }}
              >
                {`I'm a professional hairstylist and salon owner with years of experience, and I truly love what I do. I've been lucky to build an amazing, loyal client base over the years, which means a lot to me.`}
              </p>

              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light text-pretty"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-200)" }}
              >
                {`I'm friendly, easy to chat with, and I love creating a relaxed, welcoming vibe in my salon. Hair isn't just my job — it's my passion. My goal is always to bring out your natural beauty, match your personal style, and make sure you leave feeling confident and happy.`}
              </p>
            </div>

            {/* Portrait image — order 1 on desktop */}
            <div className="relative aspect-[3/4] max-w-[400px] overflow-hidden rounded-lg shadow-2xl md:order-1">
              <Image
                src="/landing/magda.jpg"
                alt="Portrait of the owner of Infinity MK salon"
                width={400}
                height={533}
                quality={80}
                className="object-cover w-full h-full transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
              {/* Subtle inner vignette */}
              <div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.22)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
