"use client";

import { useRef, useState, useEffect } from "react";
import { getBrowseTags } from "@/lib/browse-tabs";
import { filterProductsByHairType, getAllFamilies } from "@/lib/davines-products";
import type { DavinesHairCareFamily } from "@/types/index";
import HairTypeFilters from "@/components/products/hair-type-filters";
import ProductFamilyRow from "@/components/products/product-family-row";

type HairTypeProps = {
    selectedTag?: string;
    scrollY?: number;
};

export default function HairType({ selectedTag = '', scrollY = 0 }: HairTypeProps) {
    const tags = getBrowseTags();
    const families = getAllFamilies();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Simple visibility detection using IntersectionObserver for initial reveal
    useEffect(() => {
        if (!sectionRef.current || isVisible) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [isVisible]);

    const effectiveTag = selectedTag || 'all-products';

    const filteredFamilies: DavinesHairCareFamily[] = families.map((family) => ({
        ...family,
        products: filterProductsByHairType(family, effectiveTag).filter(product => product.display !== false)
    })).filter((family) => family.products.length > 0);

    const totalProducts = filteredFamilies.reduce((sum, family) => sum + family.products.length, 0);
    
    return (
        <section 
            ref={sectionRef}
            id="products-section" 
            className="space-y-2 sm:space-y-4 sm:px-4 py-2"
        >
            {/* Heading Section */}
            <div className="text-center mb-2 sm:mb-4">
                <h2 
                    className={`reveal-child${isVisible ? " is-visible" : ""} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--main-100) mb-2 sm:mb-3 lg:mb-4 text-balance`}
                    style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                >
                    Find your perfect match
                </h2>
                <p 
                    className={`reveal-child${isVisible ? " is-visible" : ""} text-sm sm:text-base md:text-lg text-(--main-200) max-w-xl mx-auto px-4`}
                    style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
                >
                    Select your hair type to discover products formulated for your specific needs.
                </p>
            </div>

            {/* Filter buttons */}
            <div 
                id="filter-section" 
                className={`reveal-child${isVisible ? " is-visible" : ""} pb-2 bg-[--main-500]/95 sticky top-0 z-20`}
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
                {/* CSS-controlled spacer: height transitions smoothly when .is-stuck is applied */}
                <div
                    className="filter-sticky-spacer"
                    aria-hidden="true"
                />
                <HairTypeFilters tags={tags} />
            </div>

            {/* Results count */}
            <div 
                id="products-results" 
                className={`reveal-child${isVisible ? " is-visible" : ""} text-center`}
                style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            >
                <p className="text-center text-xs sm:text-sm text-(--main-200)">
                    {totalProducts} product{totalProducts !== 1 ? "s" : ""} found.
                </p>
            </div>

            {/* Product Family Rows */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-7xl mx-auto px-2">
                {filteredFamilies.map((family, index) => (
                    <div
                        key={family.id}
                        className={`reveal-child${isVisible ? " is-visible" : ""}`}
                        style={{ "--reveal-delay": `${400 + index * 100}ms` } as React.CSSProperties}
                    >
                        <ProductFamilyRow family={family} />
                    </div>
                ))}
            </div>
        </section>
    );
}
