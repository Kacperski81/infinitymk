"use client";

import { Suspense } from "react";
import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products/products-content";
import Logo from "@/components/frame/logo";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Products() {
    const { contentRef, scrollState } = useSmoothScroll(0.075);
    return (
        <main className="">
            <Logo />
            <ScrollIndicator progress={scrollState.progress} />
            <div ref={contentRef} className="smooth-scroll-wrapper">

                <ProductsHero />
                <section id="products-section" className="py-16">
                    <Suspense fallback={<div className="text-center text-(--main-200)">Loading products...</div>}>
                        <ProductsContent />
                    </Suspense>
                </section>
                <Footer />
            </div>
        </main>
    );
}