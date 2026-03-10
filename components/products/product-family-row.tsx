"use client"

import dynamic from "next/dynamic"
import { useRef, useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import type { DavinesHairCareFamily, DavinesHairCareProduct } from "@/types"
import SmallProductCard from "./small-product-card"
import FamilyInformation from "./family-information"

const DavinesProductCard = dynamic(() => import("./davines-product-card"), { ssr: false })

type DavinesHairCareFamilyRowProps = {
    family: DavinesHairCareFamily
}

export default function DavinesHairCareFamilyRow({ family }: DavinesHairCareFamilyRowProps) {
    const [selectedProduct, setSelectedProduct] = useState<DavinesHairCareProduct | null>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isScrollable, setIsScrollable] = useState(false)
    const [expandedFamily, setExpandedFamily] = useState<string | null>(null)
    const pendingRef = useRef(false)
    const rafRef = useRef(0)
    const displayProducts = family.products.filter((product) => product.display)

    const checkScrollability = useCallback(() => {
        const container = scrollContainerRef.current
        if (!container) return
        const maxScroll = container.scrollWidth - container.clientWidth
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(container.scrollLeft < maxScroll - 1)
        setIsScrollable(maxScroll > 0)
        setScrollProgress(maxScroll > 0 ? container.scrollLeft / maxScroll : 0)
        pendingRef.current = false
    }, [])

    const scheduleScrollabilityCheck = useCallback(() => {
        if (!pendingRef.current) {
            pendingRef.current = true
            rafRef.current = requestAnimationFrame(checkScrollability)
        }
    }, [checkScrollability])

    useEffect(() => {
        checkScrollability()
        window.addEventListener("resize", checkScrollability)
        
        // Watch scroll container for size changes (e.g., images loading)
        const container = scrollContainerRef.current
        if (container) {
            const ro = new ResizeObserver(() => checkScrollability())
            ro.observe(container)
            return () => {
                cancelAnimationFrame(rafRef.current)
                ro.disconnect()
                window.removeEventListener("resize", checkScrollability)
            }
        }
        
        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener("resize", checkScrollability)
        }
    }, [checkScrollability])

    const scroll = useCallback((direction: "left" | "right") => {
        const container = scrollContainerRef.current
        if (container) {
            const cardWidth = 280
            const scrollAmount = direction === "left" ? -cardWidth : cardWidth
            container.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" && canScrollLeft) {
                scroll("left")
            } else if (e.key === "ArrowRight" && canScrollRight) {
                scroll("right")
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [canScrollLeft, canScrollRight, scroll])

    return (
        <div className="space-y-4 product-row-reveal">
            {/* Family Header */}
            <FamilyInformation family={family} displayProducts={displayProducts} expandedFamily={expandedFamily} setExpandedFamily={setExpandedFamily} />

            {/* Scrollable Products Container */}
            <div className="relative group/row">
                {/* Left Arrow */}
                {isScrollable && (
                    <button
                        onClick={() => scroll("left")}
                        className={`absolute left-1 top-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-(--main-400)/80 text-(--main-100) backdrop-blur-sm border border-(--main-300)/50 transition-opacity duration-200 active:scale-95 ${
                            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                        style={{ transform: "translateY(-50%)" }}
                        aria-label="Scroll left"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                )}

                {/* Products Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={scheduleScrollabilityCheck}
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 product-row-scroll-container"
                >
                    {displayProducts.map((product, index) => (
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
                {isScrollable && (
                    <button
                        onClick={() => scroll("right")}
                        className={`absolute right-6 top-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-(--main-400)/80 text-(--main-100) backdrop-blur-sm border border-(--main-300)/50 transition-opacity duration-200 active:scale-95 ${
                            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                        style={{ transform: "translateY(-50%)" }}
                        aria-label="Scroll right"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Horizontal scroll indicator */}
            {isScrollable && (
                <div className="product-row-scroll-track max-w-[90%] mx-auto lg:max-w-[100%]">
                    <div
                        className="product-row-scroll-thumb"
                        style={{ transform: `translateX(${scrollProgress * (70 / 30) * 100}%)` }}
                    />
                </div>
            )}

            {selectedProduct && createPortal(
                <DavinesProductCard product={selectedProduct} family={family} onClose={() => setSelectedProduct(null)} />,
                document.body
            )}
        </div>
    )
}
