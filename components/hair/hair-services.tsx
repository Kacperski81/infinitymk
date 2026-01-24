import { useState } from "react";
import { getHairServices } from "@/lib/hair-services";
import type { HairServicesData } from "@/types/";
import PageHeading from "../page-heading";

export default function HairServices() {
    const hairServicesData: HairServicesData = getHairServices();
    const [expandedPanel, setExpandedPanel] = useState<string>("cut-and-style");

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    }
    return (
        <section className="isolate relative min-h-dvh xl:min-h-screen bg-(--main-400)/80 bg-[url(/hair/hair-services-bg.jpg)] bg-blend-multiply bg-cover bg-no-repeat flex justify-center xl:grid xl:grid-cols-12">
            <div className="pt-10 flex flex-col xl:col-span-5 xl:col-start-6 z-10">
                <PageHeading mT="mt-0" title="Hair Services" />

                {/* wrapper */}
                <div className="price-panel z-2 relative grow flex justify-center p-4 xl:pb-10">


                    {/* Accordion */}
                    <div className="grow flex flex-col gap-4 px-2 lg:px-10 md:min-w-[700px] max-w-[500px] md:max-w-[700px] xl:w-[800px] xl:max-w-[1000px] mx-auto">

                        {hairServicesData.map((service) => {
                            return (

                                // Accordion panel
                                <div
                                    key={service.id}
                                    onClick={() => togglePanel(service.id)}
                                    className={`flex flex-col border-gradient isolate relative overflow-hidden ${expandedPanel === service.id ? "shadow-xl price-panel-opened" : "shadow-xl price-panel-closed cursor-pointer"}`}   
                                >

                                    {/* Accordion heading */}
                                    <h3 id={`${service.name}-heading`}
                                        className={``}
                                    >

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
                                    <div
                                        id={`${service.name}-content`}
                                        aria-labelledby={`${service.name}-heading`}
                                        role="region"
                                        aria-hidden={service.id !== expandedPanel}
                                        className={`
                                                flex
                                                flex-col 
                                                -z-1
                                                text-xl min-h-0  
                                                ${expandedPanel === service.id ? "grow flex flex-col" : ""}`}
                                    >

                                        <div className={`
                                                    p-1 
                                                    lg:px-6 
                                                    text-left 
                                                    relative
                                                    opacity-0
                                                    overflow-y-auto
                                                    min-h-0
                                                    ${expandedPanel === service.id ? "opacity-100 transition-opacity duration-500 delay-500" : "opacity-0 transition-opacity duration-200 delay-100"}`}
                                            style={{ scrollbarWidth: 'thin',scrollbarColor: 'var(--main-300) var(--main-300)'}}
                                        >

                                            <ul className="">
                                                {service.items.map((item) => {
                                                    return (
                                                        <li
                                                            key={item.service}
                                                            className="
                                                                    group 
                                                                    border-b 
                                                                    border-b-(--main-300) 
                                                                    last:border-b-0 
                                                                    p-2  
                                                                    text-sm 
                                                                    md:text-base 
                                                                    xl:text-lg  
                                                                    xl:px-4"

                                                        >
                                                            <div className="flex justify-between">
                                                                <p className={`self-end text-(--main-100) ${item.service.startsWith("*") ? "text-xs md:text-sm" : ""}`}>{item.service}</p>
                                                                <div className="flex gap-4 lg:gap-8 text-(--main-200)">
                                                                    {
                                                                        item.price && (
                                                                            <p className=""><span className="text-(--main-50)">{item.price}</span></p>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.short_hair_price && (
                                                                            <p className="flex flex-col items-center">Short <span className="flex flex-col text-(--main-50) text-right">{item.short_hair_price}</span></p>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.medium_hair_price && (
                                                                            <p className="flex flex-col items-center">Medium <span className="flex flex-col text-(--main-50) text-right">{item.medium_hair_price}</span></p>
                                                                        )
                                                                    }
                                                                    {
                                                                        item.long_hair_price && (
                                                                            <p className="">Long <span className="flex flex-col text-(--main-50) text-right">{item.long_hair_price}</span></p>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>

            {/* <div className="absolute inset-0 z-0 bg-gradient-to-l from-(--main-400)/70 to-transparent"></div> */}
        </section>
    )
}