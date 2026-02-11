"use client";

import Footer from "@/components/footer";
import DesktopGallery from "@/components/gallery/desktop-gallery";
import MobileGallery from "@/components/gallery/mobile-gallery";
import NailServices from "@/components/nail/nail-services";
import { getNailGalleryImages } from "@/lib/nail-gallery-images";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import Logo from "@/components/frame/logo";

export default function Nail() {
    const nailImages = getNailGalleryImages();
    const { contentRef, scrollState } = useSmoothScroll(0.075);
    return (
        <main>
            <Logo />
            <ScrollIndicator progress={scrollState.progress} />
            <div ref={contentRef} className="smooth-scroll-wrapper">

                <NailServices scrollY={scrollState.current}/>

                {/* Mobile gallery */}
                <section className="xl:hidden">
                    <MobileGallery pictures={nailImages} />
                </section>

                {/* Desktop gallery */}
                <section className="hidden xl:block">
                    <DesktopGallery pictures={nailImages} />
                </section>

                <Footer />
            </div>
        </main>
    )
}