import PageHeading from "@/components/page-heading";
import Testimonial from "@/components//landing/testimonial"
import { getTestimonialsData } from "@/lib/testimonials-data"
import Carousel from "@/components/landing/carousel";

export default function Testimonials({scrollY, viewportHeight} : {scrollY: number, viewportHeight: number}) { 
    const testimonials = getTestimonialsData();

    return (
        <section className="min-h-svh xl:min-h-screen">

            <main className="md:grow w-full flex flex-col py-2 xl:py-4 gap-4 md:gap-6">

                <PageHeading title="What Our Clients Say" />

                <p className="leading-relaxed text-sm sm:text-base md:text-lg text-(--main-100) text-center">
                    Discover why our clients trust us with their hair transformations
                </p>

                <div className="mt-4 hidden xl:px-16 xl:grow xl:grid xl:grid-cols-4 xl:gap-10 xl:min-h-[550px] xl:max-h-[600px] overflow-hidden">

                    {testimonials.map((testimonial) => (
                        <Testimonial key={testimonial.id} {...testimonial} />
                    ))}
                </div>

                <div className="xl:hidden grow flex max-w-[90dvw] md:max-w-[500px] mx-auto pb-10">
                    <Carousel />
                </div>


            </main>
        </section>
    )
}