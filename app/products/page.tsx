import { Suspense } from "react";
import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products/products-content";
import Logo from "@/components/frame/logo";

export default function Products() {
    return (
        <main className="">
            <Logo />
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