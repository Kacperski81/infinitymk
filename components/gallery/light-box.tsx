import LightBoxCarousel from "@/components/gallery/light-box-carousel";
import type { CarouselItem } from "@/types";
import IconCloseCircle from "@/components/svgs/close-circle";

export type LightBoxItem = {
    id: string;
    imageUrl: string;
    alt: string;
}

type Props = {
    open: boolean;
    item: LightBoxItem | null;
    items: CarouselItem[];
    onClose: () => void;
    handleOverlayClick: (e: React.MouseEvent) => void;
}

export default function LightBox({ open, item, items, onClose, handleOverlayClick }: Props) {

    if (!open || !item) return null;

    return (
        <div className="fixed inset-0 bg-(--main-800)/90 max-w-full max-h-screen z-50 flex justify-center items-center p-4" onClick={handleOverlayClick}>
            <div className="relative">
                <button aria-label="Close" className="absolute -top-6 -right-4 cursor-pointer z-100 w-10" onClick={onClose}><IconCloseCircle /></button>
                <div className="bg-white shadow-lg">
                    <LightBoxCarousel items={items} item={item} />
                </div>
            </div>
        </div>
    )
}