"use client"

import { useRef, useState, useEffect } from "react"
import type { DavinesHairCareFamily, DavinesHairCareProduct } from "@/types"
import DavinesProductCard from "./davines-product-card"
import SmallProductCard from "./small-product-card"
import RightArrow from "../svgs/right-arrow"
import LeftArrow from "../svgs/left-arrow"

type DavinesHairCareFamilyRowProps = {
    family: DavinesHairCareFamily
}

export default function DavinesHairCareFamilyRow({ family }: DavinesHairCareFamilyRowProps) {
    const [selectedProduct, setSelectedProduct] = useState<DavinesHairCareProduct | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [totalPages, setTotalPages] = useState(1)

    const checkScrollability = () => {
        const container = scrollContainerRef.current
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0)
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1)
        }
    }

    useEffect(() => {
        checkScrollability()
        window.addEventListener("resize", checkScrollability)
        return () => window.removeEventListener("resize", checkScrollability)
    }, [family.products])

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current
        if (container) {
            const cardWidth = 280 // Card width + gap
            const scrollAmount = direction === "left" ? -cardWidth : cardWidth
            container.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }

    const handleScroll = () => {
        checkScrollability()
    }

    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container || !isHovering) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" && canScrollLeft) {
                scroll("left")
            } else if (e.key === "ArrowRight" && canScrollRight) {
                scroll("right")
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isHovering, canScrollLeft, canScrollRight])

    const showControls = family.products.length > 4

    return (
        <div className="space-y-4" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {/* Family Header */}
            <div className="flex items-center justify-between px-2">
                <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-(--main-100) tracking-wide">{family.family}</h3>
                    <p className="text-xs sm:text-sm text-(--main-300) mt-0.5 sm:mt-1">
                        {family.products.length} product{family.products.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {/* Scrollable Products Container */}
            <div className="relative group">
                {/* Left Arrow */}
                {showControls && (
                    <button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-(--main-400)/90 text-(--main-100) backdrop-blur-sm border border-(--main-300) transition-all duration-300 ${canScrollLeft && isHovering
                            ? "opacity-100 -translate-x-3"
                            : "opacity-0 pointer-events-none"
                            } hover:bg-(--main-300) hover:scale-110`}
                        aria-label="Scroll left"
                    >
                        <LeftArrow />
                    </button>
                )}

                {/* Products Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-thin scrollbar-thumb-(--main-400) scrollbar-track-transparent hover:scrollbar-thumb-(--main-400)"
                    style={{
                        scrollbarWidth: "thin",
                        msOverflowStyle: "none",
                    }}
                >
                    {family.products.map((product, index) => (
                        <div
                            key={`${family.id}-${product.name}-${index}`}
                            className="flex-shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)]"
                            style={{ minWidth: "260px", maxWidth: "320px" }}
                        >
                            <SmallProductCard product={product} familyName={family.family} onClick={() => setSelectedProduct(product)} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                {showControls && (
                    <button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-(--main-400)/90 text-(--main-100) backdrop-blur-sm border border-(--main-300) transition-all duration-300 ${canScrollRight && isHovering
                            ? "opacity-100 translate-x-3"
                            : "opacity-0 pointer-events-none"
                            } hover:bg-(--main-300) hover:scale-110`}
                        aria-label="Scroll right"
                    >
                        <RightArrow />
                    </button>
                )}
            </div>

            {selectedProduct && <DavinesProductCard product={selectedProduct} family={family} onClose={() => setSelectedProduct(null)} />}
        </div>
    )
}
