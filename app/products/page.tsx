import Hero from "@/components/products/products-hero";
import ProductsAbout from "@/components/products/products-about";
import Footer from "@/components/footer";

export default function Products() {
    return (
        <main>
            <div>
                <Hero />
                <ProductsAbout />
            </div>
            
            <Footer />
        </main>
    )
}