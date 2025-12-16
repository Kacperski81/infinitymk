import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import LeftArrow from "@/components/svgs/left-arrow";
import RightArrow from "@/components/svgs/right-arrow";
import type { LightBoxCarouselProps } from "@/types";

export default function LightBoxCarousel({ items, item }: LightBoxCarouselProps) {
    const initialIndex = items.findIndex(i => i.id === item.id);
    const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex !== -1 ? initialIndex : 0);
    const [containerDimensions, setContainerDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const [isReady, setIsReady] = useState(false); // State to control visibility
    const [isNavigating, setIsNavigating] = useState(false); // State to control transitions
    const containerRef = useRef<HTMLDivElement>(null);
    
    // navigation
    const navigate = (number: 1 | -1) => {
        setIsNavigating(true); // Enable transitions when user clicks
        if (selectedIndex <= 0 && number === -1) return;
        if (selectedIndex >= items.length - 1 && number === 1) return;
        setSelectedIndex(prevIndex => prevIndex + number);
    }

    const getCarouselStyle = () => {
        return {
            transform: `translateX(-${containerDimensions.width * selectedIndex}px)`,
            // Only apply transition if isNavigating is true
            transition: isNavigating ? 'transform 300ms ease-in-out' : 'none'
        }
    }

    // This callback will measure the container. We'll call it at the right times.
    const measureContainer = useCallback(() => {
        const el = containerRef.current;
        if (el) {
            setContainerDimensions({ width: el.offsetWidth, height: el.offsetHeight });
        }
    }, []);

    // This effect runs on mount and when the window is resized.
    useLayoutEffect(() => {
        measureContainer(); // Measure on initial layout
        window.addEventListener('resize', measureContainer);
        return () => window.removeEventListener('resize', measureContainer);
    }, [measureContainer]);
    
    
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const images = Array.from(el.querySelectorAll('img'));
        let loadedCount = 0;

        const onImageLoad = () => {
            loadedCount++;
            // Once all images are loaded, re-measure and show the carousel.
            if (loadedCount >= images.length) {
                measureContainer();
                setIsReady(true);
            }
        };

        if (images.length === 0) {
            setIsReady(true);
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                onImageLoad(); // If image is already cached/complete
            } else {
                img.addEventListener('load', onImageLoad);
            }
        });

        return () => {
            images.forEach(img => img.removeEventListener('load', onImageLoad));
        };
    }, [items, measureContainer]); // Rerun if the items change

    return (
        <section className="border border-4 border-(--main-50)">
            <div
                ref={containerRef}
                className="min-w-[80dvw] sm:w-[550px] h-auto sm:mx-auto overflow-clip relative shadow-xl bg-black/50"
            >
                <div
                    className="w-full h-full flex transition-opacity duration-900"
                    style={{
                        opacity: isReady ? 1 : 0, // Control visibility here
                        ...getCarouselStyle()
                    }}
                >
                    {items.map((imgItem) => (
                        <img key={imgItem.id} src={imgItem.imageUrl} alt={imgItem.alt} className="min-w-full object-contain flex-shrink-0" />
                    ))}
                </div>

                {/* Buttons */}
                <div className="opacity-100 absolute inset-0 flex justify-between items-center">
                    {/* style={{ opacity: isReady ? 1 : 0, transition: 'opacity 300ms' }} */}
                    <button className="block absolute top-1/2 transform -translate-y-1/2 bottom-0 cursor-pointer left-0 hover:bg-black/20 focus-visible:bg-black/20 transition-colors duration-500 ease-in-out px-1" onClick={() => navigate(-1)}>
                        <LeftArrow />
                    </button>
                    <button className="block absolute top-1/2 transform -translate-y-1/2 bottom-0 cursor-pointer right-0 hover:bg-black/20 focus-visible:bg-black/20 transition-colors duration-500 ease-in-out px-1" onClick={() => navigate(1)}>
                        <RightArrow />
                    </button>
                </div>
            </div>
        </section>
    )
}