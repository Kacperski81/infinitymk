import AnimatedMenu from "@/components/frame/animated-menu";
import Frame from "@/components/frame/frame";
import AboutUs from "@/components/landing/about-us";
import Hero from "@/components/landing/hero";
import OurServices from "@/components/landing/our-services";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center px-[7px]">
      <div className="relative w-full max-w-[2000px]">
        <Frame />
        <AnimatedMenu />
        <div className="relative h-screen gap-4">
          <Hero />
          <AboutUs />
          <OurServices />
        </div>
      </div>
    </main>);
}
