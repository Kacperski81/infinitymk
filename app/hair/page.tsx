"use client";

import HairServices from "@/components/hair/hair-services";
import Footer from "@/components/footer";
import HairTreatment from "@/components/hair/hair-treatments";
import MobileGallery from "@/components/gallery/mobile-gallery";
import { CarouselItem } from "@/types";
import { getHairGalleryImages } from "@/lib/hair-gallery-images";
import DesktopGallery from "@/components/gallery/desktop-gallery";
import HairPartners from "@/components/hair/hair-partners";
import HairOffers from "@/components/hair/hair-offers";

export default function HairPage() {
    const hairImages: CarouselItem[] = getHairGalleryImages();

    return (
        <main>
            <div className="flex flex-col">
                <HairServices />
                <HairTreatment />

                {/* Mobile gallery */}
                <section className="xl:hidden">
                    <MobileGallery pictures={hairImages} />
                </section>

                {/* Desktop gallery */}
                <section className="hidden xl:block">
                    <DesktopGallery pictures={hairImages} />
                </section>

                <section
                    className="flex flex-col gap-4">
                    <HairPartners />
                    <HairOffers />

                </section>

                <Footer />
            </div>
        </main>
    );
}