import Image from "next/image";
import ProductsBackgroundImage from "../../public/products/products-background2.jpg";
import HeroButton from "@/components/products/hero-button";

export default function ProductsHero() {

    return (
        <section className="px-2 relative min-h-screen inset-0 overflow-hidden flex flex-col justify-center items-start">

            {/* Background Images */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={ProductsBackgroundImage}
                    alt="Products background"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-450)/80 via-(--main-450)/60 to-(--main-450)/40 md:from-(--main-450)/70) md:via-(--main-450)/50 md:to-transparent"></div>
            </div>

            {/* Text */}
            <div className="relative px-4 sm:px-6 lg:ml-12 xl:ml-20 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 text-(--main-50) max-w-6xl leading-tight">
                {/* <h2 className="text-left font-(family-name:--font-red-hat-text) font-semi text-3xl sm:text-3xl lg:text-4xl xl:text-7xl 2xl:text-8xl"> */}
                <h2 className="text-left font-(family-name:--font-red-hat-text) font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-balance">
                    We proudly offer Davines products at our salon.
                </h2>
                {/* <p className="text-left text-lg md:text-xl font-(family-name:--font-lato) font-bold tracking-widest text-(--main-10)"> */}
                <p className="text-left text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide sm:tracking-wider md:tracking-widest text-(--main-10) max-w-2xl">
                Discover sustainable beauty and professional hair care with the Davines collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <HeroButton label="Explore by Hair Type" href="#products-section" />
            </div>
        </div>
        </section >
    );
}