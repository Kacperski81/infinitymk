"use client";

import PageHeading from "@/components/page-heading";
import Testimonial from "@/components/landing/testimonial";
import { getTestimonialsData } from "@/lib/testimonials-data";
import Carousel from "@/components/landing/carousel";
import { useScrollFade } from "@/hooks/use-scroll-fade";

export default function Testimonials({ scrollY }: { scrollY: number }) {
    const testimonials = getTestimonialsData();

    const { sectionRef, isVisible, fadeOutStyle } = useScrollFade(scrollY, {
        inThreshold: 0.08,
        fadeOutStart: 0.72,
        fadeOutEnd: 0.96,
        translateRange: 36,
    });

    return (
        <section ref={sectionRef} className="min-h-svh xl:min-h-screen">
            <main className="md:grow w-full flex flex-col py-2 xl:py-4 gap-2 md:gap-4">

                {/* Heading block — staggered reveal + fadeOut wrapper */}
                <div style={fadeOutStyle}>
                    <div
                        className={`reveal-child${isVisible ? " is-visible" : ""}`}
                        style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                    >
                        <PageHeading title="What Our Clients Say" />
                    </div>

                    <p
                        className={`reveal-child${isVisible ? " is-visible" : ""} leading-relaxed text-base sm:text-lg md:text-xl text-(--main-100) text-center`}
                        style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                    >
                        Discover why our clients trust us with their hair transformations
                    </p>
                </div>

                <div className="mt-2 hidden xl:px-16 xl:grow xl:grid xl:grid-cols-4 xl:gap-10 xl:min-h-[550px] xl:max-h-[600px] overflow-hidden">
                    {testimonials.map((testimonial) => (
                        <Testimonial key={testimonial.id} {...testimonial} />
                    ))}
                </div>

                <div className="xl:hidden grow flex max-w-[90dvw] md:max-w-[500px] mx-auto pb-10">
                    <Carousel />
                </div>
            </main>
        </section>
    );
}
