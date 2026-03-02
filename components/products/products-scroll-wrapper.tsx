"use client";

import { Suspense } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import ProductsHero from "@/components/products/products-hero";
import ProductsContent from "@/components/products/products-content";
import OverlayTransition from "@/components/overlay-transition";
import Footer from "@/components/footer";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";

/**
 * Products page scroll wrapper — mirrors the home page's smooth scroll system.
 * Uses the same lerp factor (0.075) for consistent feel across routes.
 */
export default function ProductsScrollWrapper() {
    const { contentRef, scrollState } = useSmoothScroll(0.075);

    return (
        <section className="h-screen flex justify-center items-center">
            <div className="relative w-full max-w-[2000px]">
                <div className="relative h-screen gap-4">
                    <ScrollIndicator progress={scrollState.progress} />
                    <div ref={contentRef} className="smooth-scroll-wrapper">
                        <ProductsHero scrollY={scrollState.current} />
                        <OverlayTransition>
                            <div className="py-16">
                                <Suspense fallback={<div className="text-center text-(--main-200)">Loading products...</div>}>
                                    <ProductsContent />
                                </Suspense>
                            </div>
                            <Footer />
                        </OverlayTransition>
                    </div>
                </div>
            </div>
        </section>
    );
}
