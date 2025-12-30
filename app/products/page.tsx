import Hero from "@/components/products/products-hero";
import ProductsAbout from "@/components/products/products-about";
import Footer from "@/components/footer";

export default function Products() {
    return (
        <main className="">
            <div className="">
                <Hero />
            </div>
            <div className="">
                <ProductsAbout />
            </div>

            {/* <div className="w-full min-h-screen">

            </div> */}
            <Footer />
        </main>
    )
}