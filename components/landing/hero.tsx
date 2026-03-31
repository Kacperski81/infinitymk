import Image from "next/image";
import DesktopImage from "../../public/landing/hero-background.jpg";

export default function Hero({ scrollY, onImageLoad }: { scrollY: number, onImageLoad?: () => void }) {
    const s = Number.isFinite(scrollY) ? scrollY : 0;;
    const parallax = s * 0.35;

    // Fade hero t0 0 over the first 700px of scroll
    const opacity = Math.max(0, Math.min(1, 1 - s / 700));

    return (
        <section className="photo-section md:px-2 relative min-h-screen inset-0 overflow-hidden flex items-center">
            <div className="absolute inset-0 z-0 will-change-transform" style={{ transform: `translate3d(0, ${parallax}px, 0)` }}>
                <Image
                    src={DesktopImage}
                    alt="Salon background"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-center lg:p-2 saturate-[1.2] contrast-[1.05]"
                    onLoad={onImageLoad}
                />
                {/* Overlay */}
                <div className="lg:p-2 absolute inset-0 bg-gradient-to-r from-(--main-800)/70 via-(--main-700)/40 to-(--main-800)/60" />
                <div className="lg:p-2 absolute inset-0 bg-radial-[at_30%_40%] from-transparent via-transparent to-(--main-900)/50" />
            </div>

            {/* Hero Content */}
            <div className="relative xl:px-4 py-2 lg:p-2 h-full z-20 flex flex-col gap-5 lg:gap-20 md:w-full sm:text-center" style={{ opacity, transform: `translate3d(0, ${parallax * 0.4}px, 0)` }}>
                <h1 className="font-(family-name:--font-aboreto) font-semibold text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight tracking-wider hero-background-gradient drop-shadow-[0_4px_24px_rgba(0,0,0,0.3)] mx-2">
                    {/* Feel<br />Good,<br /> Look<br />Amazing. */}
                    Feel Good,<br />Look Amazing.
                </h1>
                <p className="font-sans text-base md:text-lg font-light text-(--main-50) drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] dark:text-gray-200 text-pretty mx-2">
                    Step into a world of beauty and relaxation. We're here to make you shine.
                </p>
            </div>
        </section>
    );
}