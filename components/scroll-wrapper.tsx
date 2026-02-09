"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import AboutUs from "@/components/landing/about-us";
import Hero from "@/components/landing/hero";
import OverlayTransition from "@/components/overlay-transition";
import OurServices from "@/components/landing/our-services";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/footer";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";

export default function ScrollWrapper() {
    const { contentRef, scrollState } = useSmoothScroll(0.075);

    return (
        <main className="h-screen flex justify-center items-center">
            <div className="relative w-full max-w-[2000px]">
                <div className="relative h-screen gap-4">
                    <ScrollIndicator progress={scrollState.progress} />
                    <div ref={contentRef} className="smooth-scroll-wrapper">
                        <Hero  scrollY={scrollState.current}/>
                        <OverlayTransition>

                            <AboutUs />
                            <OurServices />
                            <Testimonials />
                            <Footer />
                        </OverlayTransition>
                    </div>
                </div>
            </div>
        </main>
    );
}