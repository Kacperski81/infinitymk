"use client";

import SectionHeading from "@/components/landing/section-heading";
import Testimonial from "@/components//landing/testimonial"
import { getTestimonialsData } from "@/lib/testimonials-data"
import Carousel from "@/components/landing/carousel";
import { useViewportAnimation } from "@/hooks/use-viewport-animation";

export default function Testimonials({scrollY, viewportHeight} : {scrollY: number, viewportHeight: number}) { 
    const testimonials = getTestimonialsData();

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
        fadeOutStart: 0.2,
        fadeOutEnd: 0.85,
        imageScaleEnabled: true,
        imageScaleMin: 0.92,
        imageOpacityMin: 0.4,
    });

    return (
        <section
            ref={ref as React.RefObject<HTMLElement>}
            className="min-h-svh xl:min-h-screen"
        >
            <main
                className="md:grow w-full flex flex-col py-2 xl:py-4 gap-4 md:gap-6 will-change-transform"
                style={{
                    opacity: contentOpacity,
                    transform: `translate3d(0, ${contentTranslateY}px, 0)`,
                }}
            >

                <SectionHeading variant="page" title="What Our Clients Say" />

                <p className="leading-relaxed text-sm sm:text-base md:text-lg text-(--main-100) text-center">
                    Discover why our clients trust us with their hair transformations
                </p>

                <div
                    className="mt-4 hidden xl:px-16 xl:grow xl:grid xl:grid-cols-4 xl:gap-10 xl:min-h-[550px] xl:max-h-[600px] overflow-hidden will-change-transform"
                    style={{
                        opacity: imageOpacity,
                        transform: `scale(${imageScale})`,
                        transition: isInViewport ? "none" : "opacity 0.3s, transform 0.3s",
                    }}
                >

                    {testimonials.map((testimonial) => (
                        <Testimonial key={testimonial.id} {...testimonial} />
                    ))}
                </div>

                <div className="xl:hidden grow flex max-w-[90dvw] md:max-w-[500px] mx-auto pb-10">
                    <Carousel />
                </div>


            </main>
        </section>
    )
}