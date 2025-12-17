import { getDavinesCards } from "@/lib/davines-cards"
import IconAnnouncement from "@/components/svgs/announcement";
import IconDiscount from "@/components/svgs/discount";
import PageHeading from "@/components/page-heading";


export default function ProductCards() {
    const hairOffers = getDavinesCards();

    return (

        <div className="space-y-4 md:space-y-6 lg:space-y-8 max-w-[2000px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {hairOffers.map((offer) => {
                    const IconComponent = offer.icon === "Announcement" ? IconAnnouncement : IconDiscount;
                    return (
                        <div key={offer.id}
                            className="hair-partner-logo
                                backdrop-blur-[2px]
                                text-(--main-50) 
                                rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow">

                            <div className="flex flex-col items-start gap-4">
                                <div className="p-3 rounded-lg shrink">
                                    <IconComponent />
                                </div>
                                <div className="flex flex-col *:text-left">
                                    <h3 className="text-lg md:text-xl font-bold mb-2">{offer.title}</h3>
                                    <p className="text-sm md:text-base leading-relaxed text-(--main-100)">{offer.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}