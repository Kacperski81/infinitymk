import essentialHairCare from "@/data/essential-hair-care.json";
import type { EssentialHairCareData } from "@/types";

export function getEssentialHairCare(name: string): EssentialHairCareData {
    const data = essentialHairCare;
    console.log("Name", name)
    switch (name) {
        case 'dede':
            return data.filter(item => item.family.startsWith('DEDE'));
        default:
            return [];
    }
}