import { getBrowseTags } from "@/lib/browse-tabs";
import { filterProductsByFamily, getAllFamilies } from "@/lib/davines-products";
import type { DavinesHairCareFamily } from "@/types/index";
import HairTypeFilters from "@/components/products/hair-type-filters";
import ProductFamilyRow from "@/components/products/product-family-row";

type HairTypeProps = {
    selectedTag?: string;
};

export default function HairType({ selectedTag = '', }: HairTypeProps) {
    const tags = getBrowseTags();
    const families = getAllFamilies();

    const effectiveTag = selectedTag || 'all-products';

    const filteredFamilies: DavinesHairCareFamily[] = families.map((family) => ({
        ...family,
        products: filterProductsByFamily(family, effectiveTag)
    })).filter((family) => family.products.length > 0);

    const totalProducts = filteredFamilies.reduce((sum, family) => sum + family.products.length, 0);
    return (
        <section id="products-section" className="space-y-2 sm:space-y-4 px-2 sm:px-4 py-2">
            <div className="text-center mb-2 sm:mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-(--main-100) mb-2 sm:mb-3 lg:mb-4 text-balance">
                    Find your perfect match
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-(--main-200) max-w-xl mx-auto px-4">
                    Select your hair type to discover products formulated for your specific needs.
                </p>
            </div>

            {/* Filter buttons */}
            <HairTypeFilters tags={tags} />

            {/* Results count */}
            <div className="text-center">
                <p className="text-center text-xs sm:text-sm text-(--main-200)">
                    {totalProducts} product{totalProducts !== 1 ? "s" : ""} found across {filteredFamilies.length}{" "}
                    {filteredFamilies.length !== 1 ? "families" : "family"}
                </p>
            </div>

            {/* Product Family Rows */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 max-w-7xl mx-auto">
                {filteredFamilies.map((family) => (
                    <ProductFamilyRow key={family.id} family={family} />
                ))}
            </div>
        </section>
    )
}