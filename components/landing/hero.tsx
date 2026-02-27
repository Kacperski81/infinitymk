"use client";

import Image from "next/image";
import DesktopImage from "../../public/landing/hero-background.jpg";
import { useTopEdgeFade } from "@/hooks/use-top-edge-fade";

export default function Hero({ scrollY, onImageLoad }: { scrollY: number; onImageLoad?: () => void }) {
    const s = Number.isFinite(scrollY) ? scrollY : 0;
    const topFade = useTopEdgeFade(s, { fadeStart: 80, fadeEnd: -200, translateMax: 8 });

    // Background moves at 0.30× — slower than scroll, creates depth.
    const bgParallax = s * 0.30;

    // Content moves at 0.12× — visibly slower than background → foreground floats forward.
    const contentParallax = s * 0.12;

    // Fade hero content to 0 over the first 600 px of scroll.
    const opacity = Math.max(0, Math.min(1, 1 - s / 600));

    // Subtle fade-in for the text on first load (CSS-driven, no scroll dependency).
    return (
        <section className="px-2 relative min-h-screen inset-0 overflow-hidden flex items-center">
            {/* Background layer — moves slowest */}
            <div
                className="absolute inset-0 z-0 will-change-transform"
                style={{ transform: `translate3d(0, ${bgParallax}px, 0)` }}
            >
                <Image
                    src={DesktopImage}
                    alt="Infinity MK salon interior"
                    priority
                    fill
                    sizes="100vw"
                    className="h-full w-full object-cover object-center lg:p-2 saturate-[1.15] contrast-[1.05]"
                    onLoad={onImageLoad}
                />
                {/* Directional overlay — deeper shadow on scroll-entry edges */}
                <div className="lg:p-2 absolute inset-0 bg-gradient-to-r from-(--main-800)/75 via-(--main-700)/35 to-(--main-800)/65" />
                <div className="lg:p-2 absolute inset-0 bg-radial-[at_30%_40%] from-transparent via-transparent to-(--main-900)/55" />
                {/* Bottom fade to blend into next section */}
                {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-(--main-450)/80 to-transparent" /> */}
            </div>

            {/* Foreground content layer — moves at intermediate rate */}
            <div
                className="relative p-2 h-full z-20 flex flex-col gap-5 lg:gap-20 md:w-full sm:text-center animate-hero-in"
                style={{
                    opacity,
                    transform: `translate3d(0, ${contentParallax}px, 0)`,
                }}
            >
                <h1
                    ref={topFade.ref("heading")}
                    className="font-(family-name:--font-aboreto) font-semibold text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight tracking-wider hero-background-gradient drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)] text-balance"
                    style={topFade.style("heading")}
                >
                    Feel Good,<br />Look Amazing.
                </h1>
                <p
                    ref={topFade.ref("subtitle")}
                    className="font-sans text-base md:text-lg font-light tracking-widest uppercase text-(--main-50) drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] text-pretty"
                    style={topFade.style("subtitle")}
                >
                    Step into a world of beauty and relaxation. We're here to make you shine.
                </p>
            </div>
        </section>
    );
}
