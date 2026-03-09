"use client";

import { Suspense } from "react";
import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products/products-content";
import Logo from "@/components/frame/logo";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import { useNativeScrollProgress } from "@/hooks/use-native-scroll-progress";

export default function Products() {
    const { progress } = useNativeScrollProgress();

    return (
        <main className="">
            <Logo />
            <ScrollIndicator progress={progress} />
            <ProductsHero />
            <section id="products-section" className="py-16">
                <Suspense fallback={<div className="text-center text-(--main-200)">Loading products...</div>}>
                    <ProductsContent />
                </Suspense>
            </section>
            <Footer />
        </main>
    );
}