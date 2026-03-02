"use client";

import { Suspense } from "react";
import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products/products-content";
import Logo from "@/components/frame/logo";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

/**
 * Products Page with Optimized Smooth Scrolling
 * 
 * Uses the enhanced useSmoothScroll hook with:
 * - Frame-rate independent interpolation (consistent across 60Hz/120Hz/144Hz)
 * - Momentum-based touch scrolling for natural mobile feel
 * - Debounced resize handling to prevent mid-scroll jumps
 * - Throttled state updates to minimize React re-renders
 * 
 * The scrollState.current value is passed to child components for
 * parallax effects via the useParallax hook.
 */
export default function Products() {
    const { contentRef, scrollState } = useSmoothScroll(0.075, {
        // Optimized settings for products page
        snapThreshold: 0.05,        // Lower threshold prevents visible snap jumps
        stateUpdateInterval: 16,    // ~60fps state updates
        enableMomentum: true,       // Natural momentum on touch devices
        momentumDecay: 0.95,        // Gradual momentum decay
        touchMultiplier: 1.5,       // Balanced touch sensitivity
    });

    return (
        <main className="relative">
            <Logo />
            <ScrollIndicator progress={scrollState.progress} />
            <div ref={contentRef} className="smooth-scroll-wrapper">
                {/* Hero with parallax support */}
                <ProductsHero scrollY={scrollState.current} />
                
                {/* Products section with persistent filters */}
                <section id="products-section" className="py-8 sm:py-12 lg:py-16">
                    <Suspense 
                        fallback={
                            <div className="text-center text-(--main-200) py-12">
                                <div className="inline-block animate-pulse">Loading products...</div>
                            </div>
                        }
                    >
                        <ProductsContent scrollY={scrollState.current} />
                    </Suspense>
                </section>
                
                <Footer />
            </div>
        </main>
    );
}
