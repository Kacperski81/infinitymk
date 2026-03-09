"use client";

import Image from "next/image";
import LocationIcon from "../svgs/location-icon";
import SectionHeading from "../landing/section-heading";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

interface AboutUsProps {
  scrollY: number;
  viewportHeight: number;
}

export default function AboutUs({ scrollY, viewportHeight }: AboutUsProps) {
  const {
    ref,
    contentOpacity,
    contentTranslateY,
    imageScale,
    imageOpacity,
    isInViewport,
  } = useViewportAnimation(scrollY, viewportHeight, {
    fadeInEnabled: true,
    fadeOutEnabled: true,
    fadeInDistance: 250,
    fadeOutStart: 0.15,
    fadeOutEnd: 0.85,
    imageScaleEnabled: true,
    imageScaleMin: 0.88,
    imageOpacityMin: 0.4,
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
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
          {/* Image with focus effect */}
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl will-change-transform"
            style={{
              opacity: imageOpacity,
              transform: `scale(${imageScale})`,
              transition: isInViewport ? "none" : "opacity 0.3s, transform 0.3s",
            }}
          >
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
            <SectionHeading title="About Us" variant="gradient" align="left" />

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
