"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getServiceData } from "@/lib/service-data";
import PageHeading from "@/components/page-heading";
import hairBG from "../../public/landing/services-hair.jpg";
import nailsBG from "../../public/landing/services-nails.jpg";
import beautyBG from "../../public/landing/services-beauty.jpg";
import productsBG from "../../public/landing/services-davines2.jpg";
import ScissorsSVG from "@/components/svgs/scissorsSVG";
import NailSVG from "@/components/svgs/nailSVG";
import BeautySVG from "../svgs/beautySVG";
import ProductSVG from "../svgs/productSVG"

export default function Services() {
    const [expandedPanel, setExpandedPanel] = useState<string>("hair");

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    }

    const serviceData = getServiceData();

    const iconMap = {
        hair: ScissorsSVG,
        nail: NailSVG,  // Fixed: was "nails", now matches service-data.json "nail"
        beauty: BeautySVG,
        products: ProductSVG
    }

    return (
        <section className="min-h-screen flex flex-col">
            <main className="grow flex flex-col lg:justify-center gap-3 xl:pb-20">


                <PageHeading title="OUR SERVICES" />
                <p className="leading-relaxed text-base sm:text-lg md:text-xl text-(--main-100) text-center">
                    {`From a simple cut to a full makeover, we've got you covered.`}
                </p>

                {/* Wrapper */}
                <div className="grow p-2 flex justify-center">

                    {/* Accordion */}
                    <div className="grow flex flex-col lg:justify-center lg:flex-row gap-(--wrapper-gap) lg:max-w-6xl">

                        {serviceData.map((service) => {
                            const IconComponent = iconMap[service.id as keyof typeof iconMap]
                            return (
                                // Accordion panel
                                <div key={service.id} onClick={() => togglePanel(service.id)}
                                    className={`relative isolate p-(--service-panel-padding) overflow-hidden 
                                    service-panel-radius 
                                    flex flex-col
                                    ${expandedPanel === service.id ? "service-panel-opened" : "service-panel-closed"}`}>
                                    {/* Accordion heading */}
                                    <h3 id={`${service.id}-heading`} className="">

                                        {/* Accordion trigger */}
                                        <button aria-controls={`${service.id}-content`} aria-expanded={service.id === expandedPanel}
                                            className="bg-transparent border-0 flex items-center flex-row-reverse gap-(--service-panel-gap)">

                                            {/* Panel title */}
                                            <span className="text-white text-lg lg:text-xl xl:text-2xl font-(family-name:--font-aboreto) relative isolate grid items-center service-button-bg">{service.name}</span>
                                            {/* Accordion icon */}
                                            {/* <div className="bg-(--accordion-button) w-(--button-small) lg:w-(--button-size) p-1 rounded-full aspect-square">{service.services[0].icon}</div> */}
                                            <div className="
                                            bg-(--main-800)/80 
                                            w-(--service-button-small) h-(--service-button-small) aspect-square p-(--service-button-padding) 
                                            rounded-full  
                                            flex justify-center"
                                            >
                                                <IconComponent /></div>
                                        </button>
                                    </h3>

                                    {/* Accordion content * Panel 1 content */}
                                    <div id={`${service.id}-content`} aria-labelledby={`${service.id}-heading}`} role="region" aria-hidden={service.id !== expandedPanel} className={`relative z-10`}>
                                        <p className={`service-panel-margin text-left relative text-white text-sm lg:text-lg max-w-[70ch] ${expandedPanel === service.id ? "opacity-100 transition-opacity duration-500 delay-500" : "opacity-0 transition-opacity duration-0 delay-0"}`}>
                                            {service.services[0].description}
                                            {/* <span className="block text-right w-full">see more</span> */}
                                            <span className="block text-right mt-2">
                                                <Link
                                                    href={`/${service.id}`} // The internal route
                                                    aria-label={`View all ${service.name} services`}
                                                    className={`w-fit border border-white text-white px-5 py-2 rounded-full uppercase text-xs font-medium tracking-widest transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white/50
                                                ${expandedPanel === service.id
                                                            ? "opacity-100 translate-y-0 transition-all duration-500 delay-700"
                                                            : "opacity-0 translate-y-2 transition-all duration-300"
                                                        }`}
                                                >
                                                    See More
                                                </Link>
                                            </span>
                                        </p>
                                    </div>
                                    <Image
                                        src={service.id === "hair" ? hairBG :
                                            service.id === "nail" ? nailsBG :
                                                service.id === "beauty" ? beautyBG :
                                                    productsBG}
                                        alt={`${service.name} service image`}
                                        fill
                                        sizes="100vw"
                                        className={`
                                            -z-1 
                                            object-cover 
                                            ${expandedPanel === service.id ?
                                                "image-brightness"
                                                : "image-brightness-light"}`}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="-z-1 absolute inset-0 -z-0 bg-gradient-to-b from-(--main-800)/80 to-transparent"></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </section>
    )
}