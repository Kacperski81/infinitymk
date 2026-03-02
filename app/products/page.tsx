"use client";

import { Suspense } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products/products-content";
import Logo from "@/components/frame/logo";

export default function Products() {
    const { contentRef, scrollState } = useSmoothScroll(0.075);

    return (
        <main>
            <Logo />
            <section className="h-screen flex justify-center items-center">
                <div className="relative w-full max-w-[2000px]">
                    <div className="relative h-screen gap-4">
                        <ScrollIndicator progress={scrollState.progress} />
                        <div ref={contentRef} className="smooth-scroll-wrapper">
                            <ProductsHero scrollY={scrollState.current} />
                            <section id="products-section" className="py-16">
                                <Suspense fallback={<div className="text-center text-(--main-200)">Loading products...</div>}>
                                    <ProductsContent scrollY={scrollState.current} />
                                </Suspense>
                            </section>
                            <Footer />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
