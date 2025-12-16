"use client";

import { useState, useRef } from "react";
import type { CarouselItem } from "@/types";
import PageHeading from "@/components/page-heading";
import DesktopGalleryImages from "@/components/gallery/desktop-gallery-images";

export default function DesktopGallery({ pictures}: { pictures: CarouselItem[]}) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const slicedPictures = pictures.slice(1, 6);
    const picturesArray: CarouselItem[][] = [];
    for (let i = 0; i < slicedPictures.length; i += 5) {
        picturesArray.push(slicedPictures.slice(i, i + 5))
    }

    // navigation
    const goToPrevious = () => {
        if (selectedIndex <= 0) return;
        setSelectedIndex(prevIndex => prevIndex - 1);
    }

    const goToNext = () => {
        if (selectedIndex >= picturesArray.length - 1) return;
        setSelectedIndex(prevIndex => prevIndex + 1);
    }

    return (
        <div className="xl:snap-start min-h-dvh xl:min-h-screen grow-1 flex justify-start items-center lg:flex lg:flex-col lg:gap-4">

            <PageHeading title="GALLERY" />

            {/* Gallery Carousel */}
            <div
                className="lg:flex lg:flex-col gap-5 lg:max-w-[70vw]"
                style={{
                    background: `linear-gradient(135deg, var(--main-100) 0%, var(--main-200) 50%, var(--main-100) 100%)`,
                    boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -2px 4px rgba(0, 0, 0, 0.2),
                        0 20px 40px rgba(0, 0, 0, 0.3),
                        0 10px 20px rgba(0, 0, 0, 0.2)
                    `,
                }}
            >
                {/* Inner shadow frame */}
                <div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                        boxShadow: `inset 0 0 20px rgba(0, 0, 0, 0.1)`,
                        border: `2px solid rgba(0, 0, 0, 0.05)`,
                    }}
                />
                <div
                    className="relative overflow-hidden"
                    style={{
                        boxShadow: `
                            0 8px 16px rgba(0, 0, 0, 0.15),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5)
                        `,
                    }}
                >

                    <div ref={containerRef} className="flex max-w-[1800px] overflow-clip">
                        {picturesArray.map((picture, index) => {
                            return <DesktopGalleryImages key={index} selectedIndex={selectedIndex} index={index} pictures={picture} />;
                        })}

                    </div>
                </div>

            </div>
        </div>
    );
}