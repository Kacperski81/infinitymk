"use client";

import { getBrowseTags } from "@/lib/browse-tabs";
import { filterProductsByHairType, getAllFamilies } from "@/lib/davines-products";
import type { DavinesHairCareFamily } from "@/types/index";
import HairTypeFilters from "@/components/products/hair-type-filters";
import ProductFamilyRow from "@/components/products/product-family-row";
import { useScrollFade } from "@/hooks/use-scroll-fade";
import { useTopEdgeFade } from "@/hooks/use-top-edge-fade";

type HairTypeProps = {
    selectedTag?: string;
    scrollY?: number;
};

export default function HairType({ selectedTag = '', scrollY = 0 }: HairTypeProps) {
    const tags = getBrowseTags();
    const families = getAllFamilies();

    // Section-level fade using same config as about-us
    const { sectionRef, isVisible, fadeOutStyle } = useScrollFade(scrollY, {
        inThreshold: 0.12,
        fadeOutStart: 0.85,
        fadeOutEnd: 0.98,
        translateRange: 24,
    });

    // Per-element top edge fade
    const topFade = useTopEdgeFade(scrollY);

    const effectiveTag = selectedTag || 'all-products';

    const filteredFamilies: DavinesHairCareFamily[] = families.map((family) => ({
        ...family,
        products: filterProductsByHairType(family, effectiveTag).filter(product => product.display !== false)
    })).filter((family) => family.products.length > 0);

    const totalProducts = filteredFamilies.reduce((sum, family) => sum + family.products.length, 0);
    
    return (
        <section 
            ref={sectionRef}
            id="hair-type-section" 
            className="space-y-2 sm:space-y-4 sm:px-4 py-2"
        >
            <div style={fadeOutStyle}>
                {/* Heading Section */}
                <div className="text-center mb-2 sm:mb-4">
                    <h2 
                        ref={topFade.ref("heading")}
                        className={`reveal-child${isVisible ? " is-visible" : ""} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--main-100) mb-2 sm:mb-3 lg:mb-4 text-balance`}
                        style={{ "--reveal-delay": "0ms", ...topFade.style("heading") } as React.CSSProperties}
                    >
                        Find your perfect match
                    </h2>
                    <p 
                        ref={topFade.ref("description")}
                        className={`reveal-child${isVisible ? " is-visible" : ""} text-sm sm:text-base md:text-lg text-(--main-200) max-w-xl mx-auto px-4`}
                        style={{ "--reveal-delay": "100ms", ...topFade.style("description") } as React.CSSProperties}
                    >
                        Select your hair type to discover products formulated for your specific needs.
                    </p>
                </div>

                {/* Filter buttons */}
                <div 
                    ref={topFade.ref("filters")}
                    id="filter-section" 
                    className={`reveal-child${isVisible ? " is-visible" : ""} pb-2 bg-[--main-500]/95 sticky top-0 z-20`}
                    style={{ "--reveal-delay": "200ms", ...topFade.style("filters") } as React.CSSProperties}
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
                    ref={topFade.ref("results")}
                    id="products-results" 
                    className={`reveal-child${isVisible ? " is-visible" : ""} text-center`}
                    style={{ "--reveal-delay": "300ms", ...topFade.style("results") } as React.CSSProperties}
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
                            ref={topFade.ref(`family-${family.id}`)}
                            className={`reveal-child${isVisible ? " is-visible" : ""}`}
                            style={{ 
                                "--reveal-delay": `${400 + index * 100}ms`,
                                ...topFade.style(`family-${family.id}`)
                            } as React.CSSProperties}
                        >
                            <ProductFamilyRow family={family} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
