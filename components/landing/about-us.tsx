"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import LocationIcon from "../svgs/location-icon";

export default function AboutUs({ scrollY }: { scrollY: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionTop, setSectionTop] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const measure = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const top = rect.top + scrollY;
    setSectionTop(top);
    setSectionHeight(rect.height);
  }, [scrollY]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

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

  return (
    <section
      ref={sectionRef}
      className="py-16 md:p-24 px-6 md:px-12 lg:px-20 xl:min-h-screen xl:min-w-full xl:flex xl:items-center"
    >
      <div
        className="max-w-6xl xl:min-w-[1400px] mx-auto will-change-transform"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/landing/about-image.jpg"
              alt="Interior of Infinity MK salon showing styling chairs, plants, and elegant decor"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <span
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-background-gradient"
              style={{ fontFamily: "var(--font-aboreto)" }}
            >
              About Us
            </span>

            <div className="w-16 h-px" style={{ background: "var(--main-200)" }} />
            <div>
              <p
                className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light"
                style={{ fontFamily: "var(--font-lato)", color: "var(--main-100)" }}
              >
                {`Nestled just off Putney High Street, a short stroll from the station, Infinity MK is your go-to salon for hair, nails, and beauty needs. We're dedicated to understanding your unique style and providing exceptional service to help you feel good and look amazing.`}
              </p>
              <p className="font-bold text-right xl:mr-20 xl:mt-4 xl:flex xl:justify-end" style={{ color: "var(--main-200)" }}>
                <a
                  href="https://www.google.com/maps/place/Infinity+MK+Hair+Salon/@51.4611462,-0.2216526,17z/data=!4m14!1m7!3m6!1s0x48760f11c7b6009d:0x8bee35c1c856d711!2sInfinity+MK+Hair+Salon!8m2!3d51.4611462!4d-0.2190723!16s%2Fg%2F1hc51mwdl!3m5!1s0x48760f11c7b6009d:0x8bee35c1c856d711!8m2!3d51.4611462!4d-0.2190723!16s%2Fg%2F1hc51mwdl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-end"
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
