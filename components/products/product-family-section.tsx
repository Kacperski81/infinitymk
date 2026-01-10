import Image from "next/image";
import type { EssentialHairCareFamily, EssentialHairCareProduct } from "@/types";
import DavinesCarousel from "./davines-carousel";
import FlexibleCarousel from "../ui/flexible-carousel";
import DavinesProductCard from "./davines-product-card";

type ProductFamilySectionProps = {
    family: EssentialHairCareFamily;
};

function ProductCard({ product }: { product: EssentialHairCareProduct }) {
    return (
        <div className="rounded-lg bg-(--card) flex flex-col">
            {/* Product Image */}
            <div className="aspect-square relative bg-(--main-200)">
                {product.image ? (
                    <img src={product.image} alt={product.name} className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-(--main-400)">
                        <span className="text-sm">Product image coming soon</span>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="h-full px-4 py-2 flex flex-col gap-2 justify-between">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-(--main-400)">{product.type}</p>
                    <h4 className="font-(family-name:--font-aboreto) text-lg text-(--main-800)">{product.name}</h4>
                    <p className="text-sm text-(--main-600) leading-relaxed line-clamp-2">
                        {product.short_description}
                    </p>
                </div>
                <p className="text-xs text-(--main-500)">Available in-store</p>
            </div>
        </div>
    );
}

export default function ProductFamilySection({ family }: ProductFamilySectionProps) {
    const familySlug = family.family.toLowerCase().replace(/\s+/g, "-");

    return (
        <section id={familySlug} className="py-12 px-4 scroll-mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Family Header */}
                <div className="grid lg:grid-cols-2 gap-8 mb-10">
                    {/* Hero Image */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-(--main-200)">
                        {family.image ? (
                            <img src={family.image} alt={family.family} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-(--main-400)">
                                <span className="text-lg"></span>
                            </div>
                        )}
                    </div>

                    {/* Family Info */}
                    <div className="flex flex-col justify-center space-y-6">
                        <h3 className="font-(family-name:--font-aboreto) text-3xl md:text-4xl xl:text-5xl text-(--main-50) tracking-wide">
                            {family.family}
                        </h3>

                        {/* Active Ingredient */}
                        <div className="space-y-2">
                            <h4 className="text-sm uppercase tracking-widest text-(--main-200) font-semibold">
                                Key Ingredient
                            </h4>
                            <p className="text-lg text-(--main-100) leading-relaxed">
                                {family.info.active}
                            </p>
                        </div>

                        {/* Properties */}
                        <div className="space-y-2">
                            <h4 className="text-sm uppercase tracking-widest text-(--main-200) font-semibold">
                                Benefits
                            </h4>
                            <p className="text-(--main-100) leading-relaxed">
                                {family.info.props}
                            </p>
                        </div>

                        {/* Story */}
                        <div className="space-y-2">
                            <h4 className="text-sm uppercase tracking-widest text-(--main-200) font-semibold">
                                The Story
                            </h4>
                            <p className="text-(--main-100) leading-relaxed text-sm">
                                {family.info.story}
                            </p>
                        </div>
                    </div>
                </div>
                <DavinesProductCard name={family.family} />
                {/* Products Grid */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {family.products.map((product) => (
                        <ProductCard key={product.name} product={product} />
                    ))}
                </div> */}

            </div>
            
        </section>
    );
}
