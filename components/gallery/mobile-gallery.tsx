import PageHeading from "@/components/page-heading";
import type { CarouselItem } from "@/types";
import { useState } from "react";
import LightBox from "@/components/gallery/light-box";

export default function MobileGallery({ pictures }: { pictures: CarouselItem[] }) {
    // pictures are for the lightbox functionality
    // images are for gallery display only
    const [visibleCount, setVisibleCount] = useState<number>(6);
    const images = pictures.slice(1, visibleCount + 1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<CarouselItem | null>(null);

    const handleImageClick = (picture: CarouselItem) => {

        // const index = pictures.findIndex((img) => img.id === picture.id);
        setSelectedItem(picture);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <div className="min-h-dvh xl:min-h-screen">
            <div className="px-3 py-2">

                <PageHeading title="GALLERY" />

                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:px-9">
                    {images.map((picture) => {
                        return (
                            <img key={picture.id} alt={picture.alt} src={picture.imageUrl}
                                className="w-full h-auto"
                                onClick={() => handleImageClick(picture)}
                            />
                        )
                    })}
                    {/* <button className="col-start-2 flex justify-end pr-4 py-1 font-(family-name:--font-aboreto) text-(--main-100)" onClick={() => setVisibleCount(visibleCount + 4)}>
                        See more ...
                    </button> */}
                </div>

                {showModal && (
                    <div className="">
                        {/* All you need to do is to find the clicked item from the images in the pictures it has 2 more items so maybe - 2 */}
                        <LightBox key={selectedItem?.id} open={showModal} onClose={handleCloseModal} item={selectedItem} items={pictures} handleOverlayClick={handleOverlayClick} />
                    </div>
                )}
            </div>
        </div>
    );
}