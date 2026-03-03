"use client";

import SectionHeading from "@/components/section-heading";
import Testimonial from "@/components/landing/testimonial";
import { getTestimonialsData } from "@/lib/testimonials-data";
import Carousel from "@/components/landing/carousel";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

interface TestimonialsProps {
  scrollY: number;
  viewportHeight: number;
}

export default function Testimonials({ scrollY, viewportHeight }: TestimonialsProps) {
  const testimonials = getTestimonialsData();

  const {
    ref,
    contentOpacity,
    contentTranslateY,
    isInViewport,
  } = useViewportAnimation(scrollY, viewportHeight, {
    fadeInEnabled: true,
    fadeOutEnabled: true,
    fadeInDistance: 250,
    fadeOutStart: 0.25,
    fadeOutEnd: 0.95,
    imageScaleEnabled: false,
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-svh xl:min-h-screen"
    >
      <main
        className="md:grow w-full flex flex-col py-2 xl:py-4 gap-2 md:gap-4 will-change-transform"
        style={{
          opacity: contentOpacity,
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
        }}
      >
        <div className="text-center">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Discover why our clients trust us with their hair transformations"
            variant="simple"
            align="center"
          />
        </div>

        {/* Desktop grid with staggered reveal */}
        <div className="mt-2 hidden xl:px-16 xl:grow xl:grid xl:grid-cols-4 xl:gap-10 xl:min-h-[550px] xl:max-h-[600px] overflow-hidden">
          {testimonials.map((testimonial, index) => {
            // Stagger animation based on index
            const staggerDelay = isInViewport ? index * 0.1 : 0;
            
            return (
              <div
                key={testimonial.id}
                style={{
                  opacity: isInViewport ? 1 : 0,
                  transform: isInViewport ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${staggerDelay}s, transform 0.5s ease ${staggerDelay}s`,
                }}
              >
                <Testimonial {...testimonial} />
              </div>
            );
          })}
        </div>

        {/* Mobile carousel */}
        <div className="xl:hidden grow flex max-w-[90dvw] md:max-w-[500px] mx-auto pb-10">
          <Carousel />
        </div>
      </main>
    </section>
  );
}
