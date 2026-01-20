import AboutUs from "@/components/landing/about-us3";
import Hero from "@/components/landing/hero";
import OurServices from "@/components/landing/our-services";
import Testimonials from "@/components/landing/testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="relative w-full max-w-[2000px]">
        <div className="relative h-screen gap-4">
          <Hero />
          <AboutUs />
          <OurServices />
          <Testimonials />
          <Footer />
        </div>
      </div>
    </main>);
}
