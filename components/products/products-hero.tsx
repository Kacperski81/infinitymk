"use client";

import Image from "next/image";
import HeroButton from "@/components/products/hero-button";

interface ProductsHeroProps {
    scrollY?: number;
}

export default function ProductsHero({ scrollY = 0 }: ProductsHeroProps) {
    const s = Number.isFinite(scrollY) ? scrollY : 0;

    // Background moves at 0.30× — slower than scroll, creates depth.
    const bgParallax = s * 0.30;

    // Content moves at 0.12× — visibly slower than background → foreground floats forward.
    const contentParallax = s * 0.12;

    // Fade hero content to 0 over the first 600 px of scroll.
    const opacity = Math.max(0, Math.min(1, 1 - s / 600));

    return (
        <section className="px-2 relative min-h-screen inset-0 overflow-hidden flex flex-col justify-center items-start">

            {/* Background layer — moves slowest */}
            <div
                className="absolute inset-0 z-0 will-change-transform"
                style={{ transform: `translate3d(0, ${bgParallax}px, 0)` }}
            >
                <Image
                    src="/products/products-background2.jpg"
                    alt="Products background"
                    fill
                    sizes="100vw"
                    quality={75}
                    priority
                    className="object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-800)/70 via-(--main-700)/40 to-(--main-800)/60"/>
                <div className="absolute inset-0 bg-radial-[at_30%_40%] from-transparent via-transparent to-(--main-900)/50" />
            </div>

            {/* Foreground content layer — moves at intermediate rate */}
            <div
                className="relative px-4 sm:px-6 lg:ml-12 xl:ml-20 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 text-(--main-50) max-w-6xl leading-tight animate-hero-in will-change-transform"
                style={{
                    opacity,
                    transform: `translate3d(0, ${contentParallax}px, 0)`,
                }}
            >
                <h2 className="text-left font-(family-name:--font-red-hat-text) font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-balance">
                    We proudly offer Davines products at our salon.
                </h2>
                <p className="text-left text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-wide sm:tracking-wider md:tracking-widest text-(--main-10) max-w-2xl">
                    Discover sustainable beauty and professional hair care with the Davines collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <HeroButton label="Explore by Hair Type" href="#products-section" />
                </div>
            </div>
        </section>
    );
}
