import Image from "next/image";
import MobileImage from "../../public/products/products-background.jpg";
import DesktopImage from "../../public/products/products-background2.jpg";
import HeroButton from "@/components/products/hero-button";
import type { BrowseMode } from "@/types";

export default function ProductsHero({ handleBrowseModeChange }: { handleBrowseModeChange: (mode: BrowseMode) => void }) {
    
    return (
        <section className="px-2 relative min-h-screen inset-0 overflow-hidden flex flex-col justify-center items-start">

            {/* Background Images */}
            <div className="block 2xl:hidden md:absolute inset-0 z-0 overflow-hidden">
                <Image
                    src={MobileImage}
                    alt="Products background"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-right"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-r from-(--main-450)/95 via-(--main-450)/80 to-transparent"></div> */}
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-450)/60 via-(--main-450)/50 to-(--main-450)/70"></div>
            </div>
            <div className="hidden 2xl:block md:absolute inset-0 z-0">
                <Image
                    src={DesktopImage}
                    alt="Salon background"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-450)/95 via-(--main-450)/80 to-transparent"></div>
            </div>

            {/* Text */}
            <div className="relative px-4 lg:ml-20 flex flex-col gap-10 xl:gap-20 text-(--main-50) max-w-6xl leading-tight">
                <h2 className="text-left font-(family-name:--font-red-hat-text) font-semi text-3xl sm:text-3xl lg:text-4xl xl:text-7xl 2xl:text-8xl">We proudly offer Davines products at our salon.</h2>
                <p className="text-left text-lg md:text-xl font-(family-name:--font-lato) font-bold tracking-widest text-(--main-10)">
                    Discover sustainable beauty and professional hair care with the Davines collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <HeroButton label="Explore by Hair Type" handleBrowseModeChange={() => handleBrowseModeChange('hair-type')} />
                    <HeroButton label="Explore by Collection" handleBrowseModeChange={() => handleBrowseModeChange('collection')} />
                </div>
            </div>
        </section>
    );
}