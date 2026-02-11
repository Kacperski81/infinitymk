"use client";

import BeautyServices from "@/components/beauty/beauty-services";
import Footer from "@/components/footer";
import Logo from "@/components/frame/logo";
import { ScrollIndicator } from "@/components/frame/scroll-indicator";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Beauty() {
    const { contentRef, scrollState } = useSmoothScroll(0.075);
    return (
        <main>
            <Logo />
            <ScrollIndicator progress={scrollState.progress} />
            <div ref={contentRef} className="smooth-scroll-wrapper">
                <BeautyServices scrollY={scrollState.current}/>
                <Footer />
            </div>
        </main>
    )
}