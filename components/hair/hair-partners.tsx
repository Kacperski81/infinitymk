"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { getHairPartners } from "@/lib/hair-partners";
import { useTheme } from "@/components/theme/theme-provider";
import SectionHeading from "@/components/landing/section-heading";


export default function HairPartners() {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const scrollerLogos = getHairPartners();
    const { theme } = useTheme();

    const getImagePath = (basePath: string) => {
        if (theme === "dark") {
            // Replace file extension with -dark version
            // e.g., "public/hair/partners/salon.jpg" → "public/hair/partners/salon-dark.jpg"
            const lastDot = basePath.lastIndexOf('.');
            const nameWithoutExt = basePath.substring(0, lastDot -1);
            const extension = basePath.substring(lastDot);
            return `${nameWithoutExt}3${extension}`;
        }
        return basePath;
    };

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
    }, []);

    return (
        <div>
            <SectionHeading variant="page" title="Our Partners" />

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
                            <li key={`${logo.name}-${theme}`} className="hair-partner-logo
                            backdrop-blur-[2px]
                            rounded-md p-2 md:p-4 shadow-md hover:shadow-lg transition-shadow w-[150px] md:w-[200px] lg:w-[250px] flex items-center justify-center">
                                <Image 
                                    src={getImagePath(logo.imagePath)} 
                                    alt={logo.altText} 
                                    width={250} 
                                    height={100} 
                                    quality={75} 
                                    className="w-full h-auto object-contain" 
                                />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}