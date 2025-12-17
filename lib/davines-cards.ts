import davinesCards from "@/data/davines-cards.json";

import type { HairOffer } from "@/types";

export function getDavinesCards(): HairOffer[] {
    return davinesCards;
}