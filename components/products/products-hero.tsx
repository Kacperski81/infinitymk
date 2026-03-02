"use client";

import Image from "next/image";
import HeroButton from "@/components/products/hero-button";
import { useParallax, PARALLAX_PRESETS } from "@/hooks/use-parallax";

interface ProductsHeroProps {
    scrollY?: number;
}

/**
 * Products Hero Section with Parallax Effects
 * 
 * Parallax Configuration:
 * - bgSpeed: 0.2 - Background moves at 20% of scroll speed for depth
 * - contentSpeed: 0.06 - Content moves subtly for floating effect
 * - fadeStart: 150 - Fade begins after 150px of scroll
 * - fadeDistance: 500 - Gradual fade over 500px for smooth transition
 * 
 * The parallax effect creates visual depth by:
 * 1. Moving the background image slower than scroll (creates depth)
 * 2. Moving content even slower (creates floating effect)
 * 3. Fading out as section scrolls past (smooth exit)
 */
export default function ProductsHero({ scrollY = 0 }: ProductsHeroProps) {
    // Use hero preset with custom overrides
    const { ref, bgStyle, contentStyle, opacity, isInView } = useParallax(scrollY, {
        ...PARALLAX_PRESETS.hero,
        bgSpeed: 0.2,           // Moderate background parallax
        contentSpeed: 0.06,     // Subtle content movement
        fadeStart: 150,         // Start fading after 150px scroll
        fadeDistance: 500,      // Fade over 500px for gradual transition
        scaleStart: 1,          // No initial scale
        scaleEnd: 1.02,         // Slight zoom on scroll
        eased: true,            // Smooth easing for natural feel
    });

    return (
        <section 
            ref={ref as React.RefObject<HTMLDivElement>}
            className="px-2 relative min-h-screen inset-0 overflow-hidden flex flex-col justify-center items-start"
        >
            {/* Background Images with Parallax */}
            <div 
                className="absolute inset-0 z-0"
                style={isInView ? bgStyle : undefined}
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
                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-(--main-800)/70 via-(--main-700)/40 to-(--main-800)/60"/>
                <div className="absolute inset-0 bg-radial-[at_30%_40%] from-transparent via-transparent to-(--main-900)/50" />
            </div>

            {/* Text Content with Parallax */}
            <div 
                className="relative px-4 sm:px-6 lg:ml-12 xl:ml-20 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 text-(--main-50) max-w-6xl leading-tight"
                style={isInView ? { ...contentStyle, opacity } : { opacity: 1 }}
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
