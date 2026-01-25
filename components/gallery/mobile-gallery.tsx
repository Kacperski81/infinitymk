"use client";

import { useState } from "react";
import PageHeading from "@/components/page-heading";
import MobileGalleryModal from "@/components/gallery/mobile-gallery-modal";
import type { CarouselItem } from "@/types";    

export default function MobileGallery({pictures} : {pictures: CarouselItem[] }) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const handleImageClick = (index: number) => {
        console.log(index);
        setSelectedIndex(index);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className="min-h-svh">
            <div className="px-3 py-2">
                <PageHeading title="GALLERY" />

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                    {pictures.map((picture, index) => {
                        return (
                            <button key={picture.id} onClick={() => handleImageClick(index)} className="group relative aspect-[16/21] overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                <img alt={picture.alt} src={picture.imageUrl} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-100" />
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