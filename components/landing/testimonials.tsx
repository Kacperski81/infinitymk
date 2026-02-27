"use client";

import PageHeading from "@/components/page-heading";
import Testimonial from "@/components//landing/testimonial"
import { getTestimonialsData } from "@/lib/testimonials-data"
import Carousel from "@/components/landing/carousel";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { useTopEdgeFade } from "@/hooks/use-top-edge-fade";

export default function Testimonials({ scrollY }: { scrollY: number }) { 
    const testimonials = getTestimonialsData();
    const { sectionRef, isVisible, fadeOutStyle } = useScrollFade(scrollY, {
        inThreshold: 0.10,
        fadeOutStart: 0.70,
        fadeOutEnd: 0.95,
        translateRange: 30,
    });
    const topFade = useTopEdgeFade(scrollY, {fadeStart: 10, fadeEnd: -900, translateMax: 12});

    return (
        <section ref={sectionRef} className="min-h-svh xl:min-h-screen">

            <main className="md:grow w-full flex flex-col py-2 xl:py-4 gap-2 md:gap-4" style={fadeOutStyle}>

                <div ref={topFade.ref("heading")} style={topFade.style("heading")}>
                    <PageHeading title="What Our Clients Say" />
                </div>

                <p ref={topFade.ref("subtitle")} className="leading-relaxed text-base sm:text-lg md:text-xl text-(--main-100) text-center" style={topFade.style("subtitle")}>
                    Discover why our clients trust us with their hair transformations
                </p>

                <div ref={topFade.ref("cards")} className="mt-2 hidden xl:px-16 xl:grow xl:grid xl:grid-cols-4 xl:gap-10 xl:min-h-[550px] xl:max-h-[600px] overflow-hidden" style={topFade.style("cards")}>

                    {testimonials.map((testimonial) => (
                        <Testimonial key={testimonial.id} {...testimonial} />
                    ))}
                </div>

                <div ref={topFade.ref("carousel")} className="xl:hidden grow flex max-w-[90dvw] md:max-w-[500px] mx-auto pb-10" style={topFade.style("carousel")}>
                    <Carousel />
                </div>


            </main>
        </section>
    )
}