"use client"

import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import LeftArrow from "@/components/svgs/left-arrow";
import RightArrow from "@/components/svgs/right-arrow";
import Testimonial from "@/components/landing/testimonial";
import StarIconSVG from "@/components/svgs/starSVG";
import { getTestimonialsDataCarousel } from "@/lib/testimonials-data";

export default function Carousel() {
    const testimonials = getTestimonialsDataCarousel();
    const [isSliderEnd, setIsSliderEnd] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(1);
    const [containerDimensions, setContainerDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // navigation
    const navigate = (number: 1 | -1) => {
        if (selectedIndex <= 0 && number === -1) return;
        if (selectedIndex >= testimonials.length - 1 && number === 1) return;
        setSelectedIndex(prevIndex => prevIndex + number);
    }

    const getImageSize = useCallback(() => {
        const el = containerRef.current
        if (el) {
            const width = el.offsetWidth;
            const height = el.offsetHeight;
            setContainerDimensions({ width, height });
            console.log({ width, height })
            return { width, height }
        }
        return { width: 0, height: 0 }
    }, []);

    const getCarouselStyle = () => {

        return {
            transform: `translateX(-${containerDimensions.width * selectedIndex}px)`,
            transition: `${isSliderEnd ? 'none' : 'transform 500ms ease-in-out'}`
        }
    }

    const toggleTransition = () => {
        setIsSliderEnd(true)

        setTimeout(() => {
            setIsSliderEnd(false)
        }, 50)
    }

    const handleTransitionEnd = () => {
        console.log('transition end')
        if (selectedIndex === 0) {
            toggleTransition();
            setSelectedIndex(testimonials.length - 2)
        }
        if (selectedIndex === testimonials.length - 1) {
            toggleTransition();
            setSelectedIndex(1);
        }
    }

    useLayoutEffect(() => {

        getImageSize();

        const roTarget = containerRef.current;
        if (!roTarget) return;

        const ro = new ResizeObserver(() => {
            getImageSize();
        });
        ro.observe(roTarget);

        const onOrientation = () => getImageSize();
        window.addEventListener('orientationchange', onOrientation);

        return () => {
            ro.disconnect();
            window.removeEventListener('orientationchange', onOrientation);
        }
    }, [getImageSize]);

    // ensure we re-measure when images load (handles slow network / first paint)
    useEffect(() => {
        const divs = containerRef.current?.querySelectorAll('.testimonial-slide') ?? [];
        const onLoad = () => getImageSize();
        divs.forEach(div => div.addEventListener('load', onLoad));
        return () => divs.forEach(div => div.removeEventListener('load', onLoad));
    }, [testimonials, getImageSize]);


    return (

        // Carousel Container
        <div ref={containerRef} className="grow flex relative overflow-hidden max-h-[75dvh] min-h-[70dvh]">

            {/* Carousel Slide */}
            <div className="w-full h-full min-h-full flex" style={getCarouselStyle()} onTransitionEnd={handleTransitionEnd}>


                {testimonials.map((testimonial, index) => {
                    return (
                        <div key={index}
                            style={{
                                backgroundImage: `url(${testimonial.backgroundImage})`,
                                backgroundPosition: `${testimonial.id === 1 || 4 ? 'top' : 'bottom'}`
                            }}
                            className="
                            min-w-full
                            max-w-[700px]
                            relative
                            isolate
                            bg-cover
                            bg-no-repeat
                            flex
                            p-2
                            justify-center
                            items-start
                            rounded-2xl
                            overflow-hidden">
                            <div className="
                                rounded-md
                                px-4
                                py-2
                                isolate
                                z-1
                                text-(--main-50)
                                w-full
                                sm:w-3/4
                                text-center
                                ">

                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-2 justify-center">
                                    {Array.from({ length: testimonial.rating }).map((_, index) => (
                                        <div key={index} className="w-5 h-5 aspect-square">
                                            <StarIconSVG  />
                                        </div>
                                    ))}
                                </div>

                                {/* Comment */}
                                <blockquote className="mb-4">
                                    <p className="text-[var(--main-50)] text-sm lg:text-base leading-relaxed font-light">&ldquo;{testimonial.content}&rdquo;</p>
                                </blockquote>

                                {/* Reviewer Name with Accent Line */}
                                <div className="flex items-center gap-3 justify-end">
                                    <div className="hidden h-px md:w-8 bg-[var(--yellow-300)]" />
                                    <cite className="not-italic text-[var(--main-100)] font-medium text-sm lg:text-base mr-4">{testimonial.reviewer}</cite>
                                </div>
                            </div>
                            <div className="rounded-xl -z-1 absolute inset-0 -z-0 bg-gradient-to-b from-(--main-800)/80 to-transparent"></div>
                        </div>
                    )
                })}

            </div>
            {/* Buttons */}
            <div className="">
                <button className="block absolute top-1/2 transform -translate-y-1/2 bottom-0 cursor-pointer left-0 hover:bg-black/20 focus-visible:bg-black/20 transition-colors duration-500 ease-in-out w-10 h-10 " onClick={() => navigate(-1)}>
                    <LeftArrow />
                </button>
                <button className="block absolute top-1/2 transform -translate-y-1/2 bottom-0 cursor-pointer right-0 hover:bg-black/20 focus-visible:bg-black/20 transition-colors duration-500 ease-in-out w-10 h-10 " onClick={() => navigate(1)}>
                    <RightArrow />
                </button>
            </div>
        </div >
    )
}