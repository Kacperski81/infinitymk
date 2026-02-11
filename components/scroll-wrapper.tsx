"use client";

import { useState, useCallback } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import AboutUs from "@/components/landing/about-us";
import AboutTheOwner from "@/components/landing/about-the-owner";
import Hero from "@/components/landing/hero";
import OverlayTransition from "@/components/overlay-transition";
import OurServices from "@/components/landing/our-services";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/footer";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import { LoadingOverlay } from "./loading-overlay";
import Logo from "./frame/logo";

export default function ScrollWrapper() {
    const [introDone, setIntroDone] = useState(false);
    const [heroImageLoaded, setHeroImageLoaded] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const { contentRef, scrollState } = useSmoothScroll(0.075);

    const handleHeroImageLoad = useCallback(() => {
        setHeroImageLoaded(true);
    }, []);

    const handleIntroComplete = useCallback(() => {
        setIntroDone(true);
    }, []);

    const handleExitStart = useCallback(() => {
        setIsExiting(true);
    }, []);

    const isOverlayVisible = !introDone
    return (
        <main>
            {/* <LoadingOverlay isContentReady={false} onComplete={() => {}} /> */}
            <Logo isOverlayVisible={isOverlayVisible} isAnimatingOut={isExiting} />
            {/* Loading counter overlay */}
            {!introDone && (
                <LoadingOverlay isContentReady={heroImageLoaded} onComplete={handleIntroComplete} onExitStart={handleExitStart} />
            )}
            <section className="h-screen flex justify-center items-center">
                <div className="relative w-full max-w-[2000px]">
                    <div className="relative h-screen gap-4">
                        <ScrollIndicator progress={scrollState.progress} />
                        <div ref={contentRef} className="smooth-scroll-wrapper">
                            <Hero scrollY={scrollState.current} onImageLoad={handleHeroImageLoad} />
                            <OverlayTransition>

                                <AboutUs scrollY={scrollState.current} />
                                <AboutTheOwner scrollY={scrollState.current} />
                                <OurServices />
                                <Testimonials />
                                <Footer />
                            </OverlayTransition>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}