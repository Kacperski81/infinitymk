"use client";

import { useState, useRef, useCallback, useLayoutEffect } from "react";
import { getEssentialHairCare } from "@/lib/essential-hair-care";
import RightArrow from "@/components/svgs/right-arrow";
import LeftArrow from "@/components/svgs/left-arrow";

export default function DavinesProductCard({ name }: { name: string }) {
    const davinesProducts = getEssentialHairCare(name);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [containerDimensions, setContainerDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [isSliderEnd, setIsSliderEnd] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null);
    // console.log("Davines products:", davinesProducts);

    // navigation
    const navigate = (number: 1 | -1) => {
        console.log("Navigating:", number);
        console.log("Selected index before navigation:", selectedIndex);
        if (selectedIndex <= 0 && number === -1) return;
        if (selectedIndex >= davinesProducts[0].products.length - 1 && number === 1) return;
        setSelectedIndex(prevIndex => prevIndex + number);
    }

    const getCardSize = useCallback(() => {
        const el = containerRef.current
        if (el) {
            const width = el.offsetWidth;
            const height = el.offsetHeight;
            setContainerDimensions({ width, height });
            // console.log({ width, height })
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

    useLayoutEffect(() => {

        getCardSize();

        const roTarget = containerRef.current;
        if (!roTarget) return;

        const ro = new ResizeObserver(() => {
            getCardSize();
        });
        ro.observe(roTarget);

        const onOrientation = () => getCardSize();
        window.addEventListener('orientationchange', onOrientation);

        return () => {
            ro.disconnect();
            window.removeEventListener('orientationchange', onOrientation);
        }
    }, [getCardSize]);


    return (

        // <div className="space-y-4 md:space-y-6 lg:space-y-8 mx-auto">
        <div ref={containerRef} className="overflow-hidden">

            {/* <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6 p-2"> */}
            {/* Carousel Container */}
            <div className="flex relative">

                {/* Carousel Slide */}
                <div className="w-full h-full min-h-full flex" style={getCarouselStyle()}>


                    {davinesProducts[0].products.map((product) => {
                        return (
                            <div key={product.name} className="rounded-lg min-w-full bg-white">
                                {/* Card */}
                                <div className="mx-auto grid xl:grid-cols-2 rounded-lg bg-(--card)">

                                    {/* Product Image */}
                                    <div className="w-full h-full p-2">
                                        <img className="w-full h-full object-cover object-center xl:rounded-l-lg overflow-hidden" src={product.image} />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex flex-col justify-between p-8 lg:p-12">
                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-sm uppercase tracking-wider mb-2 font-medium text--muted-foreground">{product.type}</p>
                                                <h3 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground">{product.name}</h3>
                                            </div>

                                            <p className="text-lg leading-relaxed">
                                                {product.short_description}
                                            </p>

                                            <div className="pt-6 border-t">
                                                <p className="text-base leading-relaxed mb-6">
                                                    {product.full_description}
                                                </p>
                                                <div className="space-y-2">
                                                    <h4 className="text-sm uppercase tracking-wider font-medium">
                                                        HOW TO USE
                                                    </h4>
                                                    <p className="text-sm leading-relaxed">
                                                        {product.usage}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between pt-8 mt-8 border-t">
                                            <div>
                                                <p className="text-3xl font-light">{product.price}</p>
                                                <p className="text-xs mt-1">Available in-store</p>
                                            </div>
                                            <button className="hidden px-4 py-2 min-w-[140px]">Add To Cart</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        )
                    })}

                </div>

                {/* Buttons */}
                <div className="">
                    <button className="block absolute top-1/2 transform -translate-y-1/2 bottom-0 cursor-pointer left-0 w-10 h-10 " onClick={() => navigate(-1)}>
                        <LeftArrow />
                    </button>
                    <button className="block absolute top-1/2 transform -translate-y-1/2 bottom-0 cursor-pointer right-0 w-10 h-10 " onClick={() => navigate(1)}>
                        <RightArrow />
                    </button>
                </div>
            </div>
        </div >
    )
}