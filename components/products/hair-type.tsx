import { getBrowseTags } from "@/lib/browse-tabs";
import { filterProductsByHairType, getAllFamilies } from "@/lib/davines-products";
import type { DavinesHairCareFamily } from "@/types/index";
import HairTypeFilters from "@/components/products/hair-type-filters";
import ProductFamilyRow from "@/components/products/product-family-row";

type HairTypeProps = {
    selectedTag?: string;
    scrollY?: number;
};

/**
 * HairType Component with Persistent Filter UI
 * 
 * Filter UI Behavior:
 * - Mobile: Collapsible dropdown that stays accessible at top of viewport
 * - Tablet: Horizontal scrollable pills
 * - Desktop: Centered pill layout with separators
 * 
 * All variants use sticky positioning to remain visible during scroll,
 * with smooth background transition when stuck to top.
 */
export default function HairType({ selectedTag = '', scrollY = 0 }: HairTypeProps) {
    const tags = getBrowseTags();
    const families = getAllFamilies();

    const effectiveTag = selectedTag || 'all-products';

    const filteredFamilies: DavinesHairCareFamily[] = families.map((family) => ({
        ...family,
        products: filterProductsByHairType(family, effectiveTag).filter(product => product.display !== false)
    })).filter((family) => family.products.length > 0);

    const totalProducts = filteredFamilies.reduce((sum, family) => sum + family.products.length, 0);
    
    return (
        <section id="products-section" className="space-y-2 sm:space-y-4 sm:px-4 py-2">
            {/* Header */}
            <div className="text-center mb-2 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--main-100) mb-2 sm:mb-3 lg:mb-4 text-balance">
                    Find your perfect match
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-(--main-200) max-w-xl mx-auto px-4">
                    Select your hair type to discover products formulated for your specific needs.
                </p>
            </div>

            {/* 
              Persistent Filter UI
              - Uses sticky positioning to stay visible during scroll
              - Background becomes semi-transparent with blur when stuck
              - Smooth height transition when becoming sticky
              - Accessible on all screen sizes with appropriate layouts
            */}
            <div 
                id="filter-section" 
                className="pb-2 sticky top-0 z-20 bg-(--main-500)/95 backdrop-blur-sm transition-all duration-300"
            >
                {/* CSS-controlled spacer: height transitions smoothly when .is-stuck is applied */}
                <div
                    className="filter-sticky-spacer"
                    aria-hidden="true"
                />
                <HairTypeFilters tags={tags} />
            </div>

            {/* Results count with fade transition */}
            <div id="products-results" className="text-center transition-opacity duration-200">
                <p className="text-center text-xs sm:text-sm text-(--main-200)">
                    {totalProducts} product{totalProducts !== 1 ? "s" : ""} found.
                </p>
            </div>

            {/* Product Family Rows */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-7xl mx-auto px-2">
                {filteredFamilies.map((family) => (
                    <ProductFamilyRow key={family.id} family={family} scrollY={scrollY} />
                ))}
            </div>
        </section>
    );
}
