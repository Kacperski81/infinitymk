"use client";

import Image from "next/image";
import LocationIcon from "../svgs/location-icon";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { useTopEdgeFade } from "@/hooks/use-top-edge-fade";

export default function AboutUs({ scrollY }: { scrollY: number }) {
  const { sectionRef, isVisible, fadeOutStyle } = useScrollFade(scrollY, {
    inThreshold: 0.12,
    fadeOutStart: 0.65,
    fadeOutEnd: 0.95,
    translateRange: 36,
  });
  const topFade = useTopEdgeFade(scrollY);
  const imageFade = useTopEdgeFade(scrollY, { fadeStart: 0, fadeEnd: -500, translateMax: 6 });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:p-24 px-6 md:px-12 lg:px-20 xl:min-h-screen xl:min-w-full xl:flex xl:items-center"
    >
      <div
        className="max-w-6xl xl:min-w-[1400px] mx-auto w-full"
        style={fadeOutStyle}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Image — reveals first */}
          <div
            ref={imageFade.ref("image")}
            className={`reveal-child${isVisible ? " is-visible" : ""}`}
            style={{ "--reveal-delay": "0ms", ...imageFade.style("image") } as React.CSSProperties}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/landing/about-image.jpg"
                alt="Interior of Infinity MK salon showing styling chairs, plants, and elegant decor"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={75}
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
          </div>

          {/* Content — staggered after image */}
          <div className="flex flex-col gap-6">
            {/* Heading */}
            <span
              ref={topFade.ref("heading")}
              className={`reveal-child${isVisible ? " is-visible" : ""} text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-background-gradient text-balance`}
              style={{
                fontFamily: "var(--font-aboreto)",
                "--reveal-delay": "120ms",
                ...topFade.style("heading"),
              } as React.CSSProperties}
            >
              About Us
            </span>

            {/* Divider */}
            <div
              ref={topFade.ref("divider")}
              className={`reveal-child${isVisible ? " is-visible" : ""} w-16 h-px`}
              style={{
                background: "var(--main-200)",
                "--reveal-delay": "200ms",
                ...topFade.style("divider"),
              } as React.CSSProperties}
            />

            {/* Body text + link */}
            <div
              ref={topFade.ref("text")}
              className={`reveal-child${isVisible ? " is-visible" : ""}`}
              style={{ "--reveal-delay": "300ms", ...topFade.style("text") } as React.CSSProperties}
            >
              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light text-pretty"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-100)" }}
              >
                {`Nestled just off Putney High Street, a short stroll from the station, Infinity MK is your go-to salon for hair, nails, and beauty needs. We're dedicated to understanding your unique style and providing exceptional service to help you feel good and look amazing.`}
              </p>
              <p className="font-bold text-right xl:mr-20 xl:mt-4 xl:flex xl:justify-end" style={{ color: "var(--main-200)" }}>
                <a
                  href="https://www.google.com/maps/place/Infinity+MK+Hair+Salon/@51.4611462,-0.2216526,17z/data=!4m14!1m7!3m6!1s0x48760f11c7b6009d:0x8bee35c1c856d711!2sInfinity+MK+Hair+Salon!8m2!3d51.4611462!4d-0.2190723!16s%2Fg%2F1hc51mwdl!3m5!1s0x48760f11c7b6009d:0x8bee35c1c856d711!8m2!3d51.4611462!4d-0.2190723!16s%2Fg%2F1hc51mwdl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-end gap-2 transition-colors duration-200 hover:text-(--main-100) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--main-200) rounded"
                >
                  <span className="mt-2 mr-2">See on the map</span>
                  <LocationIcon />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
