"use client";

import { Suspense, useMemo } from "react";
import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import ProductsContent from "@/components/products/products-content";
import Logo from "@/components/frame/logo";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

/**
 * Products Page — optimised smooth-scroll layout.
 *
 * === Why the filter was never sticking ===
 * `smooth-scroll-wrapper` is `position: fixed`.  The entire page lives inside
 * a translated fixed box, so `window.scrollY` stays at 0 forever.  An
 * `IntersectionObserver` sentinel placed inside that box is always "in view"
 * from the browser's perspective, meaning it never crosses the root margin
 * threshold and `is-stuck` is never added.
 *
 * === The correct approach ===
 * Because we own the virtual scroll position (`scrollState.current`) we can
 * compute stickiness ourselves by comparing the current virtual Y against the
 * height of the hero section.  When `scrollState.current` exceeds the hero
 * height the filter bar is in the "stuck" zone.
 *
 * We then render the filter bar as a **separate `position: fixed` element**
 * that lives outside the translated wrapper entirely.  Fixed elements are
 * always in the native viewport coordinate space, so they stay visually in
 * place no matter what transform the wrapper is carrying.
 *
 * The filter bar receives `isStuck` as a boolean so it can style itself
 * (backdrop-blur, border, etc.) accordingly.  When `!isStuck` the bar is
 * rendered normally inside the document flow so it occupies its natural
 * position within the products section.
 *
 * === Why filter changes were jumping to the hero ===
 * `handleTagClick` was calling `window.scrollTo` which has zero effect inside
 * the virtual-scroll engine (native scroll is locked at 0).  On top of that,
 * the old `updateLimit` debounce was interpolating the limit over many frames;
 * each frame `clamp(target, 0, limit)` silently pushed target backward.
 * Both issues are resolved: `scrollToVirtual` is now exported from the hook
 * and `updateLimit` clamps synchronously.
 */

/** Height of the logo bar — used to offset the sticky filter top. */
const LOGO_HEIGHT_PX = 40; // matches Logo component `top: 5px` + h-[~35px]

export default function Products() {
    const { contentRef, scrollState, scrollToVirtual } = useSmoothScroll(0.075, {
        snapThreshold:       0.05,
        stateUpdateInterval: 16,
        enableMomentum:      true,
        momentumDecay:       0.95,
        touchMultiplier:     1.5,
    });

    /**
     * The hero section is `min-h-screen` — treat 100 vh as its threshold.
     * We subtract a small buffer (16 px) so the filter bar "locks in" a beat
     * before the hero completely disappears, hiding any gap.
     */
    const isFilterStuck = useMemo(
        () => scrollState.current > (typeof window !== "undefined" ? window.innerHeight - 16 : 700),
        [scrollState.current]
    );

    return (
        <main className="relative">
            <Logo />
            <ScrollIndicator progress={scrollState.progress} />

            {/*
              Fixed filter bar — rendered outside the translated wrapper so
              it always occupies the real viewport regardless of the scroll
              transform.  Visible only when isFilterStuck is true.
            */}
            {isFilterStuck && (
                <div
                    className="fixed left-0 right-0 z-30 bg-(--main-800)/90 backdrop-blur-md border-b border-(--main-600)/40 shadow-lg"
                    style={{ top: LOGO_HEIGHT_PX }}
                >
                    <Suspense fallback={null}>
                        <ProductsContent
                            scrollY={scrollState.current}
                            scrollToVirtual={scrollToVirtual}
                            filtersOnly
                            isStuck
                        />
                    </Suspense>
                </div>
            )}

            {/* Translated scroll wrapper */}
            <div ref={contentRef} className="smooth-scroll-wrapper">
                <ProductsHero scrollY={scrollState.current} />

                <section className="py-8 sm:py-12 lg:py-16">
                    <Suspense
                        fallback={
                            <div className="text-center text-(--main-200) py-12">
                                <div className="animate-pulse">Loading products...</div>
                            </div>
                        }
                    >
                        <ProductsContent
                            scrollY={scrollState.current}
                            scrollToVirtual={scrollToVirtual}
                            isStuck={isFilterStuck}
                        />
                    </Suspense>
                </section>

                <Footer />
            </div>
        </main>
    );
}
