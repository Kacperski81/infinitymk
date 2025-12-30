import ProductCards from "@/components/products/product-card";
import FeaturedProducts from "@/components/products/featured-products";

export default function ProductsAbout() {
    return (
        <div className="relative xl:min-h-screen lg:px-10 max-w-[2000px] flex justify-center items-center">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-(--main-450)/95 via-(--main-450)/80 to-transparent"></div> */}
            {/* <h2 className="mt-10 font-(family-name:--font-lato) font-bold pt-4 pb-2 text-3xl text-(--main-50) text-left tracking-widest">Beauty + Sustainability</h2>
            <p className="leading-relaxed text-base sm:text-lg md:text-xl text-(--main-100) text-left">We believe in a thoughtful balance of substance and style, nature and science, people and spirit. </p>
            <div className="">
                <ProductCards />
            </div> */}
            <div className="flex justify-center">
                <FeaturedProducts />
            </div>
        </div>
    );
}