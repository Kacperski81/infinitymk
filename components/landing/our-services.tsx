"use client";

import { useState } from "react";
import Image from "next/image";
import { getServiceData } from "@/lib/service-data";
import ServiceButton from "@/components/landing/service-button";
import PageHeading from "@/components/page-heading";
import hairBG from "../../public/landing/services-hair.jpg";
import nailsBG from "../../public/landing/services-nails.jpg";
import beautyBG from "../../public/landing/services-beauty.jpg";
import productsBG from "../../public/landing/services-davines.jpg";
import ScissorsSVG from "@/components/svgs/scissorsSVG";
import NailSVG from "@/components/svgs/nailSVG";
import BeautySVG from "../svgs/beautySVG";
import ProductSVG from "../svgs/productSVG";
import { useScrollFade } from "@/hooks/use-scroll-fade";

export default function Services({ scrollY }: { scrollY: number }) {
    const [expandedPanel, setExpandedPanel] = useState<string>("hair");

    const { sectionRef, isVisible, fadeOutStyle } = useScrollFade(scrollY, {
        inThreshold: 0.08,
        fadeOutStart: 0.72,
        fadeOutEnd: 0.96,
        translateRange: 36,
    });

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    };

    const serviceData = getServiceData();

    const iconMap = {
        hair: ScissorsSVG,
        nail: NailSVG,
        beauty: BeautySVG,
        products: ProductSVG,
    };

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col">
            <main className="grow flex flex-col lg:justify-center gap-3 xl:pb-20">

                {/* Heading block — staggered reveal + fadeOut wrapper */}
                <div style={fadeOutStyle}>
                    <div
                        className={`reveal-child${isVisible ? " is-visible" : ""}`}
                        style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
                    >
                        <PageHeading title="OUR SERVICES" />
                    </div>

                    <p
                        className={`reveal-child${isVisible ? " is-visible" : ""} leading-relaxed text-base sm:text-lg md:text-xl text-(--main-100) text-center`}
                        style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                    >
                        {`From a simple cut to a full makeover, we've got you covered.`}
                    </p>
                </div>

                {/* Accordion wrapper */}
                <div className="grow p-2 flex justify-center">
                    <div className="grow flex flex-col lg:justify-center lg:flex-row gap-(--wrapper-gap) lg:max-w-6xl">

                        {serviceData.map((service) => {
                            const IconComponent = iconMap[service.id as keyof typeof iconMap];
                            return (
                                <div
                                    key={service.id}
                                    onClick={() => togglePanel(service.id)}
                                    className={`relative isolate p-(--service-panel-padding) overflow-hidden 
                                    service-panel-radius 
                                    flex flex-col
                                    ${expandedPanel === service.id ? "service-panel-opened" : "service-panel-closed"}`}
                                >
                                    <h3 id={`${service.id}-heading`}>
                                        <button
                                            aria-controls={`${service.id}-content`}
                                            aria-expanded={service.id === expandedPanel}
                                            className="bg-transparent border-0 flex items-center flex-row-reverse gap-(--service-panel-gap)"
                                        >
                                            <span className="text-white text-lg lg:text-xl xl:text-2xl font-(family-name:--font-aboreto) relative isolate grid items-center">
                                                {service.name}
                                            </span>
                                            <div className="bg-(--service-button-bg) w-(--service-button-small) h-(--service-button-small) p-(--service-button-padding) aspect-square rounded-full flex justify-center">
                                                <IconComponent />
                                            </div>
                                        </button>
                                    </h3>

                                    <div
                                        id={`${service.id}-content`}
                                        aria-labelledby={`${service.id}-heading}`}
                                        role="region"
                                        aria-hidden={service.id !== expandedPanel}
                                        className="relative z-10"
                                    >
                                        <p
                                            className={`service-panel-margin text-left relative text-white text-sm lg:text-lg max-w-[70ch] ${
                                                expandedPanel === service.id
                                                    ? "opacity-100 transition-opacity duration-500 delay-500"
                                                    : "opacity-0 transition-opacity duration-0 delay-0"
                                            }`}
                                        >
                                            {service.services[0].description}
                                            <span className="block text-right mt-2">
                                                <ServiceButton
                                                    href={`/${service.id}`}
                                                    label="See More"
                                                    serviceName={service.name}
                                                    visible={expandedPanel === service.id}
                                                />
                                            </span>
                                        </p>
                                    </div>

                                    <Image
                                        src={
                                            service.id === "hair" ? hairBG :
                                            service.id === "nail" ? nailsBG :
                                            service.id === "beauty" ? beautyBG :
                                            productsBG
                                        }
                                        alt={`${service.name} service image`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className={`-z-1 object-cover ${
                                            expandedPanel === service.id
                                                ? "image-brightness"
                                                : "image-brightness-light"
                                        }`}
                                    />
                                    <div className="-z-1 absolute inset-0 -z-0 bg-gradient-to-b from-(--main-800)/80 to-transparent" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </section>
    );
}
