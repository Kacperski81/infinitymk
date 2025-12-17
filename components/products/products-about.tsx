import ProductCards from "@/components/products/product-card";
import FeaturedProducts from "@/components/products/featured-products";

export default function ProductsAbout() {
    return (
        <div className="xl:min-h-screen px-4 lg:px-10 lg:ml-4 max-w-[2000px] mt-4">
            <h2 className="mt-10 font-(family-name:--font-lato) font-bold pt-4 pb-2 text-3xl text-(--main-50) text-left tracking-widest">Beauty + Sustainability</h2>
            <p className="leading-relaxed text-base sm:text-lg md:text-xl text-(--main-100) text-left">We believe in a thoughtful balance of substance and style, nature and science, people and spirit. </p>
            <div className="">
                <ProductCards />
            </div>
            <div>
                <FeaturedProducts />
            </div>
        </div>
    );
}