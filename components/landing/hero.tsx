import Image from "next/image";
import DesktopImage from "../../public/landing/hero-background.jpg";

export default function Hero() {
    return (
        <section className="px-2 relative min-h-screen inset-0 overflow-hidden flex items-center">
            <div className="md:absolute inset-0 z-0">
                <Image
                    src={DesktopImage}
                    alt="Salon background"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-center lg:p-2 saturate-[1.2] contrast-[1.05]"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-800)/70 via-(--main-700)/40 to-(--main-800)/60"/>
                <div className="absolute inset-0 bg-radial-[at_30%_40%] from-transparent via-transparent to-(--main-900)/50" />
            </div>
            <div className="relative p-2 h-full z-20 flex flex-col gap-5 lg:gap-20 md:w-full sm:text-center">
                <h1 className="
                font-(family-name:--font-aboreto) font-semibold 
                text-6xl sm:text-7xl md:text-8xl lg:text-9xl 
                leading-tight tracking-wider hero-background-gradient">
                    {/* Feel<br />Good,<br /> Look<br />Amazing. */}
                    Feel Good,<br />Look Amazing.
                </h1>
                <p className="font-sans text-base md:text-lg font-light tracking-widest uppercase text-(--main-100)/80 dark:text-gray-300/80">
                    Step into a world of beauty and relaxation. We're here to make you shine.
                </p>
            </div>
        </section>
    );
}