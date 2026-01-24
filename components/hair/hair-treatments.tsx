import { useState } from "react";
import Image from "next/image";
import { getHairTreatments } from "@/lib/hair-treatments";
import type { TreatmentsData } from "@/types/";
import PageHeading from "../page-heading";
import treatmentsDavines from "../../public/hair/treatments-davines.jpg"

export default function HairTreatment() {
    const hairTreatmentsData: TreatmentsData[] = getHairTreatments();
    const [expandedPanel, setExpandedPanel] = useState<string>("Davines");

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    }
    return (
        <section className="relative min-h-svh xl:min-h-screen bg-(--main-300)/90 bg-[url(/hair/treatments-bg.jpg)] bg-blend-multiply bg-cover bg-no-repeat bg-top-right flex justify-center xl:grid xl:grid-cols-12">
            <div className="pt-10 flex flex-col xl:col-span-5 xl:col-start-2">
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
                                            <span className="price-panel-title text-base xl:text-lg font-bold font-(family-name:--font-aboreto) uppercase tracking-wide z-40 relative"
                                            >
                                                {treatment.name}
                                            </span>
                                        </button>
                                    </h3>

                                    {/* Accordion content */}
                                    <div
                                        id={`${treatment.name}-content`}
                                        aria-labelledby={`${treatment.name}-heading`}
                                        role="region"
                                        aria-hidden={treatment.name !== expandedPanel}
                                        className={`
                                                px-2
                                                flex
                                                flex-col 
                                                z-40
                                                text-xl
                                                min-h-0  
                                                ${expandedPanel === treatment.name ? "grow flex flex-col" : ""}`}
                                    >

                                        <div className={`
                                                    p-1 
                                                    lg:px-6 
                                                    text-left 
                                                    relative
                                                    opacity-0
                                                    overflow-y-auto
                                                    min-h-0
                                                    ${expandedPanel === treatment.name ? "opacity-100 transition-opacity duration-500 delay-500" : "opacity-0 transition-opacity duration-200 delay-100"}`}
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
                                    {/* <Image 
                                        src={treatmentsDavines}
                                        alt="Davines hair treatments"
                                        sizes="100vw"
                                        fill
                                        className="z-2 object-cover object-bottom"
                                    /> */}
                                    {/* Gradient overlay */}
                                    {/* <div className="z-20 absolute inset-0 -z-0 bg-gradient-to-b from-(--main-800)/90 to-transparent"></div> */}
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