import hairPartners from "@/data/hair-partners.json";
import { HairPartnersItem } from "@/types";

export function getHairPartners(): HairPartnersItem[] {
    return hairPartners;
}