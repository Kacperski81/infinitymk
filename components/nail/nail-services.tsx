"use client";

import { useState } from "react";
import { getNailServices } from "@/lib/nail-services";
import PageHeading from "../page-heading";

export default function NailServices() {
    const [expandedPanel, setExpandedPanel] = useState<number>(0);

    const nailsServicesData = getNailServices();

    const togglePanel = (panelIndex: number) => {
        setExpandedPanel(panelIndex);
    }
    return (
        <section className="isolate relative min-h-dvh xl:min-h-screen bg-(--main-400)/80 bg-[url(/nail/nails-bg-flowers.jpg)] bg-blend-multiply bg-cover bg-no-repeat flex justify-center xl:grid xl:grid-cols-12">
            <div className="pt-10 flex flex-col xl:col-span-5 xl:col-start-6 z-10">
                <PageHeading mT="mt-0" title="Nail Services" />

                {/* wrapper */}
                <div className="price-panel z-2 relative grow flex justify-center p-4 xl:pb-10">

                    {/* Accordion */}
                    <div className="grow flex flex-col gap-4 px-2 lg:px-10 md:min-w-[700px] max-w-[500px] md:max-w-[700px] xl:w-[800px] xl:max-w-[1000px] mx-auto">

                        {nailsServicesData.map((service) => {
                            return (

                                // Accordion panel
                                <div key={service.id} onClick={() => togglePanel(service.id)} className={`flex flex-col border-gradient isolate relative overflow-hidden  ${expandedPanel === service.id ? "shadow-xl price-panel-opened" : "shadow-xl price-panel-closed cursor-pointer"}`}
                                >

                                    {/* Accordion heading */}
                                    <h3 id={`${service.name}-heading`}>
                                        <button
                                            aria-controls={`${service.name}-content`}
                                            aria-expanded={service.id === expandedPanel}
                                            className={`w-full py-(--panel-padding) z-10 
                                                ${expandedPanel === service.id ?
                                                    "" :
                                                    "py-1 md:py-5 cursor-pointer flex justify-center items-center"}`}>
                                            {/* Panel title */}
                                            <span className="price-panel-title text-base xl:text-lg font-bold font-(family-name:--font-aboreto) uppercase tracking-wide z-10 relative"
                                            >
                                                {service.name === "Colouring" ? "Colouring *" : service.name}
                                            </span>
                                        </button>
                                    </h3>

                                    {/* Accordion content */}
                                    <div id={`${service.name}-content`} aria-labelledby={`${service.name}-heading`} role="region" aria-hidden={service.id !== expandedPanel} className={`flex flex-col -z-1 text-xl min-h-0 ${expandedPanel === service.id ? "grow flex flex-col" : ""}`}>
                                        <div className={`p-1 lg:px-6 text-left relative opacity-0 overflow-y-auto min-h-0 ${expandedPanel === service.id ? "opacity-100 transition-opacity duration-500 delay-500" : "opacity-0 transition-opacity duration-200 delay-100"}`} style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--main-300) var(--main-300)' }}>
                                            <ul>
                                                {service.items.map((item) => {
                                                    return (
                                                        <li key={item.service} className="group border-b border-b-(--main-300)/70 last:border-b-0 p-2 text-sm md:text-base xl:text-lg xl:px-4">
                                                            <div className="flex justify-between">
                                                                <p className="text-(--main-100) lg:text-(--main-50)">{item.service}</p>
                                                                <p className="text-(--main-100) lg:text-(--main-50)">{item.price}</p>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section >
    );
}