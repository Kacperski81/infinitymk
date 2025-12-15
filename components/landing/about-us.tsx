import LocationIcon from "../svgs/location-icon";

export default function AboutUs() {
    return (
        <section className="isolate relative grid min-h-screen lg:grid-cols-2">
            {/* Background image & gradient overlay */}
            <img
                src="/landing/about-us.jpg"
                alt="About Us background"
                className="absolute inset-0 h-full w-full object-cover xl:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-(--main-450)/95 via-(--main-450)/80 to-transparent" />

            {/* Content wrapper pinned to right column on large screens */}
            <div className="relative z-10 flex items-center justify-center px-6 py-24 lg:col-start-2">
                <div className="font-(family-name:--font-lato) flex flex-col gap-6 max-w-xl text-xl text-right lg:text-right">
                    <h2 className="font-(family-name:--font-aboreto) text-(--main-100) text-3xl sm:text-4xl lg:text-5xl font-light">About Us</h2>
                    <p className="leading-relaxed text-base text-(--main-50) sm:text-lg md:text-xl">{`Nestled just off Putney High Street, a short stroll from the station, Infinity MK is your go-to salon for hair, nail, and beauty needs. We're dedicated to understanding your unique style and providing exceptional service to help you fell good and look amazing.`}</p>
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
        </section>
    );
}