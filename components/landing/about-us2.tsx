import LocationIcon from "../svgs/location-icon";

export default function AboutUs() {
    return (
        <section className="py-16 md:p-24 px-6 md:px-12 lg:px-20 lg:min-h-screen lg:flex lg:items-center">
            <div className="max-w-6xl xl:max-w-8xl mx-auto">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                        <img src="/landing/about-image.jpg" alt="Interior of Infinity MK salon showing styling chairs, plants, and elegant decor" className="object-cover w-full h-full" />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-6">
                        <h2 className="font-(family-name:--font-aboreto) text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-background-gradient">
                            About Us
                        </h2>
                        <p className="text-lg md:text-xl text-main-100 leading-relaxed font-light">{`Nestled just off Putney High Street, a short stroll from the station, Infinity MK is your go-to salon for hair, nails, and beauty needs. We're dedicated to understanding your unique style and providing exceptional service to help you feel good and look amazing.`}</p>
                        <p className="text-(--main-200) font-bold text-right">
                            <a
                                href="https://www.google.com/maps/place/Infinity+MK+Hair+Salon/@51.4611462,-0.2216526,17z/data=!4m14!1m7!3m6!1s0x48760f11c7b6009d:0x8bee35c1c856d711!2sInfinity+MK+Hair+Salon!8m2!3d51.4611462!4d-0.2190723!16s%2Fg%2F1hc51mwdl!3m5!1s0x48760f11c7b6009d:0x8bee35c1c856d711!8m2!3d51.4611462!4d-0.2190723!16s%2Fg%2F1hc51mwdl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-end"
                            >
                                <span className="mr-2">See on the map</span>
                                <LocationIcon />
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}