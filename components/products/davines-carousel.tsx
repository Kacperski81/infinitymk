"use client"

import FlexibleCarousel from "@/components/ui/flexible-carousel";
import { getEssentialHairCare } from "@/lib/essential-hair-care";

interface DavinesCarouselProps {
    /** Name of the product collection to display */
    collectionName: string;
    /** Show dot indicators */
    showDots?: boolean;
    /** Auto-play interval in milliseconds */
    autoPlay?: number;
}

/**
 * Example usage of FlexibleCarousel with Davines product cards.
 * This demonstrates how to pass product cards as children to the carousel.
 */
export default function DavinesCarousel({
    collectionName,
    showDots = true,
    autoPlay = 0,
}: DavinesCarouselProps) {
    const davinesProducts = getEssentialHairCare(collectionName);
    const products = davinesProducts[0]?.products || [];

    return (
        <FlexibleCarousel
            className="w-full min-h-[500px] lg:min-h-[600px]"
            slideClassName="flex items-center justify-center p-4"
            showDots={showDots}
            showArrows={true}
            loop={true}
            autoPlay={autoPlay}
        >
            {products.map((product) => (
                <div key={product.name} className="w-full max-w-[1100px] mx-auto">
                    {/* Card */}
                    <div className="grid xl:grid-cols-2 rounded-lg bg-(--card) overflow-hidden shadow-lg">
                        {/* Product Image */}
                        <div className="w-full h-64 xl:h-auto">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={product.image}
                                alt={product.name}
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col justify-between p-6 lg:p-8 xl:p-12">
                            <div className="space-y-4 lg:space-y-6">
                                <div>
                                    <p className="text-xs lg:text-sm uppercase tracking-wider mb-2 font-medium text-muted-foreground">
                                        {product.type}
                                    </p>
                                    <h3 className="text-2xl lg:text-4xl xl:text-5xl font-light tracking-tight text-foreground">
                                        {product.name}
                                    </h3>
                                </div>

                                <p className="text-base lg:text-lg leading-relaxed">
                                    {product.short_description}
                                </p>

                                <div className="pt-4 lg:pt-6 border-t">
                                    <p className="text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">
                                        {product.full_description}
                                    </p>
                                    <div className="space-y-2">
                                        <h4 className="text-xs lg:text-sm uppercase tracking-wider font-medium">
                                            HOW TO USE
                                        </h4>
                                        <p className="text-xs lg:text-sm leading-relaxed">
                                            {product.usage}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 lg:pt-8 mt-6 lg:mt-8 border-t">
                                <div>
                                    <p className="text-2xl lg:text-3xl font-light">{product.price}</p>
                                    <p className="text-xs mt-1">Available in-store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </FlexibleCarousel>
    );
}
