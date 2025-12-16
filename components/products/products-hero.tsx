import Image from "next/image";
import MobileImage from "../../public/products/products-background.jpg";
import DesktopImage from "../../public/products/products-background.jpg";

export default function ProductsHero() {
    return (
        <section className="px-2 relative min-h-screen inset-0 overflow-hidden flex items-center">
            
        <div className="block 2xl:hidden md:absolute inset-0 z-0">
                <Image
                    src={MobileImage}
                    alt="Salon background"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-450)/95 via-(--main-450)/80 to-transparent"></div>
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
            <div className="relative ml-2 lg:ml-28 h-full flex flex-col justify-center z-20">
                <h1 className="
                font-(family-name:--font-aboreto) font-semibold 
                text-6xl sm:text-7xl md:text-8xl lg:text-9xl 
                leading-tight tracking-wider hero-background-gradient">Feel<br />Good,<br /> Look<br />Amazing.</h1>
                <p className="font-sans text-base md:text-lg font-light tracking-widest uppercase text-(--main-100)/80 dark:text-gray-300/80 max-w-md">
                    Step into a world of beauty and relaxation. We're here to make you shine.
                </p>
            </div>
        </section>
    );
}