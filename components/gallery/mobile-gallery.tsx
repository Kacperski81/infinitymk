"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import Image from "next/image";
import SectionHeading from "@/components/landing/section-heading";
import type { CarouselItem } from "@/types";

const MobileGalleryModal = dynamic(() => import("@/components/gallery/mobile-gallery-modal"), { ssr: false });    

export default function MobileGallery({ pictures }: { pictures: CarouselItem[] }) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [loadedIds, setLoadedIds] = useState<Set<string>>(new Set());

    const handleImageClick = (index: number) => {
        setSelectedIndex(index);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleImageLoad = useCallback((id: string) => {
        setLoadedIds(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    }, []);

    return (
        <div className="min-h-svh">
            <div className="px-3 py-2">
                <SectionHeading variant="page" title="GALLERY" />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                    {pictures.map((picture, index) => {
                        const isLoaded = loadedIds.has(picture.id);
                        return (
                            <button key={picture.id} onClick={() => handleImageClick(index)} className="group relative aspect-[16/21] overflow-hidden rounded-lg bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                {/* Skeleton placeholder */}
                                {!isLoaded && (
                                    <div className="absolute inset-0 bg-[--main-600] animate-pulse" />
                                )}
                                <Image
                                    alt={picture.alt}
                                    src={picture.imageUrl}
                                    fill
                                    sizes="(max-width: 640px) 50vw, 33vw"
                                    quality={75}
                                    loading={index < 4 ? "eager" : "lazy"}
                                    onLoad={() => handleImageLoad(picture.id)}
                                    className={`object-cover transition-opacity duration-500 group-hover:scale-105 group-active:scale-100 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                                />
                                <div className="absolute inset-0 bg-main-900/0 group-hover:bg-main-900/10 transition-colors duration-300" />
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Modal */}
            <MobileGalleryModal isOpen={showModal} onClose={handleCloseModal} selectedIndex={selectedIndex} pictures={pictures} />
        </div>
    );
}