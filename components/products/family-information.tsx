
import IconInformation from "@/components/svgs/icon-information";
import { DavinesHairCareFamily } from "@/types";

export default function FamilyInformation({family, displayProducts, expandedFamily, setExpandedFamily}: {family: DavinesHairCareFamily, displayProducts: DavinesHairCareFamily["products"], expandedFamily: string | null, setExpandedFamily: React.Dispatch<React.SetStateAction<string | null>>}) {

    return (
        <div className="border-b border-border py-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-(--main-100)/90 leading-tight">{family.family}</h3>
                </div>
                <button 
                    onClick={() => setExpandedFamily(expandedFamily === family.id ? null : family.id)} 
                    className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors font-medium hover:scale-95 transition-transform duration-200 ease-out"
                >
                    <span className="w-5 h-5 transition-transform duration-200 ease-out hover:rotate-12">
                        <IconInformation />
                    </span>
                    <span className="whitespace-nowrap hover:underline">{expandedFamily === family.id ? "Hide Details" : "Learn More"}</span>
                </button>
            </div>
            <div
                className="grid transition-[grid-template-rows] duration-500 ease-out"
                style={{
                    gridTemplateRows: expandedFamily === family.id ? "1fr" : "0fr",
                }}
            >
                <div className={`overflow-hidden transition-opacity duration-500 ease-out ${expandedFamily === family.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="space-y-6 pt-6">
                        <div>
                            <h4 className="text-sm font-semibold text-(--main-200)/90 uppercase tracking-wide mb-2">Key Ingredient</h4>
                            <p className="text-sm sm:text-base text-foreground leading-relaxed">{family.info.active}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-(--main-200)/90 uppercase tracking-wide mb-2">Benefits</h4>
                            <p className="text-sm sm:text-base text-foreground leading-relaxed">{family.info.props}</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-(--main-200)/90 uppercase tracking-wide mb-2">Story</h4>
                            <p className="text-sm sm:text-base text-foreground leading-relaxed">{family.info.story}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}