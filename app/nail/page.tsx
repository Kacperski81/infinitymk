import Footer from "@/components/footer";
import DesktopGallery from "@/components/gallery/desktop-gallery";
import MobileGallery from "@/components/gallery/mobile-gallery";
import NailServices from "@/components/nail/nail-services";
import { getNailGalleryImages } from "@/lib/nail-gallery-images";

export default function Nail() {
    const nailImages = getNailGalleryImages();

    return (
        <main>
            <NailServices />
            
            {/* Mobile gallery */}
            <section className="xl:hidden">
                <MobileGallery pictures={nailImages} />
            </section>

            {/* Desktop gallery */}
            <section className="hidden xl:block">
                <DesktopGallery pictures={nailImages} />
            </section>

            <Footer />
        </main>
    )
}