import { getBrowseTags } from "@/lib/browse-tabs";
import { filterProductsByHairType, getAllFamilies } from "@/lib/davines-products";
import type { DavinesHairCareFamily } from "@/types/index";
import HairTypeFilters from "@/components/products/hair-type-filters";
import ProductFamilyRow from "@/components/products/product-family-row";

type HairTypeProps = {
    selectedTag?: string;
    scrollY?: number;
    /** Programmatic virtual-scroll setter forwarded from useSmoothScroll. */
    scrollToVirtual?: (px: number) => void;
    /**
     * When true, only the filter bar is rendered — used by the fixed overlay
     * in products/page.tsx so the filter is visible while scrolled past hero.
     */
    filtersOnly?: boolean;
    /** True once scrollState.current has passed the hero height. */
    isStuck?: boolean;
};

/**
 * HairType — product listing with an inline filter bar.
 *
 * `filtersOnly` mode:
 * Renders just the <HairTypeFilters> bar.  The page mounts this inside a
 * `position: fixed` overlay (outside the translated wrapper) so it appears
 * to stay at the top of the viewport after the hero scrolls away.
 *
 * Normal mode:
 * Renders the full section — header, filter bar, result count, product rows.
 * The in-flow filter bar is hidden (`invisible`) when the fixed overlay is
 * showing (`isStuck`) to avoid double rendering while preserving layout space
 * so product rows don't shift upward.
 */
export default function HairType({
    selectedTag = "",
    scrollY = 0,
    scrollToVirtual,
    filtersOnly = false,
    isStuck = false,
}: HairTypeProps) {
    const tags = getBrowseTags();

    // filtersOnly — used by the fixed sticky overlay
    if (filtersOnly) {
        return (
            <div className="w-full py-1">
                <HairTypeFilters
                    tags={tags}
                    scrollToVirtual={scrollToVirtual}
                    isStuck
                />
            </div>
        );
    }

    const families = getAllFamilies();
    const effectiveTag = selectedTag || "all-products";

    const filteredFamilies: DavinesHairCareFamily[] = families
        .map((family) => ({
            ...family,
            products: filterProductsByHairType(family, effectiveTag).filter(
                (product) => product.display !== false
            ),
        }))
        .filter((family) => family.products.length > 0);

    const totalProducts = filteredFamilies.reduce(
        (sum, family) => sum + family.products.length,
        0
    );

    return (
        <section id="products-section" className="space-y-2 sm:space-y-4 sm:px-4 py-2">
            {/* Section header */}
            <div className="text-center mb-2 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--main-100) mb-2 sm:mb-3 lg:mb-4 text-balance">
                    Find your perfect match
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-(--main-200) max-w-xl mx-auto px-4">
                    Select your hair type to discover products formulated for your specific needs.
                </p>
            </div>

            {/*
              In-flow filter bar.
              Hidden (but still occupying layout space) when the fixed overlay
              is active so the product rows don't jump upward.
            */}
            <div
                id="products-filter-inline"
                className={`pb-2 transition-opacity duration-150 ${isStuck ? "invisible" : "visible"}`}
            >
                <HairTypeFilters
                    tags={tags}
                    scrollToVirtual={scrollToVirtual}
                    isStuck={false}
                />
            </div>

            {/* Results count */}
            <div id="products-results" className="text-center">
                <p className="text-xs sm:text-sm text-(--main-200)">
                    {totalProducts} product{totalProducts !== 1 ? "s" : ""} found.
                </p>
            </div>

            {/* Product rows */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-7xl mx-auto px-2">
                {filteredFamilies.map((family) => (
                    <ProductFamilyRow key={family.id} family={family} scrollY={scrollY} />
                ))}
            </div>
        </section>
    );
}
