import { useState } from "react";
import { getHairTreatments } from "@/lib/hair-treatments";
import type { TreatmentsData } from "@/types/";
import PageHeading from "../page-heading";

export default function HairTreatment() {
    const hairTreatmentsData: TreatmentsData[] = getHairTreatments();
    const [expandedPanel, setExpandedPanel] = useState<string>("Davines");

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    }
    return (
        <section className="relative min-h-dvh xl:min-h-screen bg-(--main-400)/90 bg-[url(/hair/treatments-bg.jpg)] bg-blend-multiply bg-cover bg-no-repeat flex justify-center xl:grid xl:grid-cols-12">
            <div className="pt-10 flex flex-col xl:col-span-6 xl:col-start-2">
                <PageHeading mT="mt-0" title="Hair Treatments" />

                {/* wrapper */}
                <div className="price-panel z-2 relative grow flex justify-center p-4 xl:pb-10">


                    {/* Accordion */}
                    <div className="grow flex flex-col gap-4 px-2 lg:px-10 md:min-w-[700px] max-w-[500px] md:max-w-[700px] xl:w-[800px] xl:max-w-[1000px] mx-auto">

                        {hairTreatmentsData.map((treatment) => {
                            return (

                                // Accordion panel
                                <div
                                    key={treatment.name}
                                    onClick={() => togglePanel(treatment.name)}
                                    className={`flex flex-col border-gradient isolate relative overflow-hidden ${expandedPanel === treatment.name ? "shadow-xl price-panel-opened" : "shadow-xl price-panel-closed cursor-pointer"}`}

                                >

                                    {/* Accordion heading */}
                                    <h3 id={`${treatment.name}-heading`}
                                        className={``}
                                    >

                                        <button
                                            aria-controls={`${treatment.name}-content`}
                                            aria-expanded={treatment.name === expandedPanel}
                                            className={`w-full py-(--panel-padding) z-10 
                                                ${expandedPanel === treatment.name ?
                                                    "" :
                                                    "py-1 md:py-5 cursor-pointer flex justify-center items-center"}`}>
                                            {/* Panel title */}
                                            <span className="price-panel-title text-base xl:text-lg font-bold font-(family-name:--font-aboreto) uppercase tracking-wide z-10 relative"
                                            >
                                                {treatment.name}
                                            </span>
                                        </button>
                                    </h3>

                                    {/* Accordion content */}
                                    <div
                                        id={`${treatment.name}-content}`}
                                        aria-labelledby={`${treatment.name}-heading`}
                                        role="region"
                                        aria-hidden={treatment.name !== expandedPanel}
                                        className={`
                                                flex
                                                flex-col 
                                                -z-1
                                                text-xl  
                                                ${expandedPanel === treatment.name ? "grow flex flex-col" : ""}`}
                                    >

                                        <div className={`
                                                    p-1 
                                                    lg:px-6 
                                                    text-left 
                                                    relative
                                                    opacity-0
                                                    overflow-y-auto
                                                    ${expandedPanel === treatment.name ? "min-h-[30vh] max-h-[55vh] landscape:max-h[20vh] opacity-100 transition-opacity duration-500 delay-500" : "opacity-0 transition-opacity duration-200 delay-100"}`}
                                            style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--main-300) var(--main-300)' }}
                                        >
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-baseline border-b border-white/10 pb-2 text-sm md:text-base xl:text-lg">
                                                    <h4 className="text-(--main-100)">{treatment.name}</h4>
                                                    <p className="font-semibold text-white">{treatment.price}</p>
                                                </div>
                                                <p className="mx-auto text-sm md:text-base text-(--main-50) md:text-(--main-100) leading-relaxed max-w-[70ch]">{treatment.description}</p>
                                            </div>

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