"use client";

import { useEffect, useRef } from "react";
import { getHairPartners } from "@/lib/hair-partners";
import PageHeading from "@/components/page-heading";


export default function HairPartners() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const scrollerLogos = getHairPartners();

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Set the animated attribute
        scroller.setAttribute("data-animated", "true");

        // Get the inner container
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (!scrollerInner) return;

        // Get all children and clone them
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicate = item.cloneNode(true) as HTMLElement;
            duplicate.setAttribute("aria-hidden", "true");
            scrollerInner.appendChild(duplicate);
        });
    }, [])

    return (
        <div>
            <PageHeading title="Our Partners" />

            {/* Scroller */}
            <div
                ref={scrollerRef}
                className="scroller self-start 
                max-w-[80vw] mx-auto 
                overflow-hidden
                "
            >

                {/* Inner scroller */}
                <ul className="scroller__inner
                    py-2 
                    list-none
                    w-max
                    flex gap-[10px]
                    animate-scroll
                    will-change-transform
                    *:p-1 *:w-[200px] md:*:w-[300px] md:*:w-[400px] *:flex-shrink-0 *:flex *:items-center *:justify-center"
                >
                    {scrollerLogos.map((logo) => {
                        return (
                            <li key={logo.name} className="hair-partner-logo
                            backdrop-blur-[2px]
                            rounded-md p-2 md:p-4 shadow-md hover:shadow-lg transition-shadow w-[150px] md:w-[200px] lg:w-[250px] flex items-center justify-center">
                                <img src={logo.imagePath} alt={logo.altText} className="w-full h-auto object-contain" />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}