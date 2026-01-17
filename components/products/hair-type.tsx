import { getBrowseTags } from "@/lib/browse-tabs";
import { filterProductsByFamily, getAllFamilies, getAllProducts } from "@/lib/davines-products";
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
        <section id="hair-type" className="space-y-8 px-1">
            <div className="text-center mb-5">
                <h2 className="text-3xl md:text-4xl font-light text-(--main-100) mb-2 text-balance mb-4">
                    Find your perfect match
                </h2>
                <p className="text-(--main-200) max-w-xl mx-auto">
                    Select your hair type to discover products formulated for your specific needs.
                </p>
            </div>

            {/* Filter buttons */}
            <HairTypeFilters tags={tags} />

            {/* Results count */}
            <div className="text-center">
                <p className="text-center text-sm text-(--main-200)">
                    {totalProducts} product{totalProducts !== 1 ? "s" : ""} found across {filteredFamilies.length}{" "}
                    {filteredFamilies.length !== 1 ? "families" : "family"}
                </p>
            </div>

            {/* Product Family Rows */}
            <div className="space-y-12 max-w-7xl mx-auto">
                {filteredFamilies.map((family) => (
                    <ProductFamilyRow key={family.id} family={family} />
                ))}
            </div>
        </section>
    )
}