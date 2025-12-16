import hairOffers from "@/data/hair-offers.json";

import type { HairOffer } from "@/types";

export function getHairOffers(): HairOffer[] {
    return hairOffers;
}