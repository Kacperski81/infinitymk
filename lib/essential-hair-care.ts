import essentialHairCare from "@/data/essential-hair-care.json";
import oiData from "@/data/oi.json";
import heartOfGlassData from "@/data/heart-of-glass.json";
import type { EssentialHairCareData, EssentialHairCareFamily } from "@/types";

export function getEssentialHairCare(name: string): EssentialHairCareData {
    const data = essentialHairCare;
    const normalizedName = name.toLowerCase().replace(/-/g, ' ');
    
    switch (normalizedName) {
        case 'dede':
            return data.filter(item => item.family.startsWith('DEDE'));
        case 'minu':
            return data.filter(item => item.family.startsWith('MINU'));
        case 'nounou':
            return data.filter(item => item.family.startsWith('NOUNOU'));
        case 'momo':
            return data.filter(item => item.family.startsWith('MOMO'));
        case 'love smoothing':
        case 'love-smoothing':
            return data.filter(item => item.family.startsWith('LOVE SMOOTHING'));
        case 'love curl':
        case 'love-curl':
            return data.filter(item => item.family.startsWith('LOVE CURL'));
        case 'solu':
            return data.filter(item => item.family.startsWith('SOLU'));
        case 'melu':
            return data.filter(item => item.family.startsWith('MELU'));
        case 'volu':
            return data.filter(item => item.family.startsWith('VOLU'));
        default:
            return [];
    }
}

export function getAllEssentialHairCareFamilies(): EssentialHairCareData {
    return essentialHairCare as EssentialHairCareData;
}

export function getOiFamilies(): EssentialHairCareData {
    return oiData as EssentialHairCareData;
}

export function getHeartOfGlassFamilies(): EssentialHairCareData {
    return heartOfGlassData as EssentialHairCareData;
}

export function getCollectionFamilies(collectionSlug: string): EssentialHairCareData {
    switch (collectionSlug) {
        case 'essential-hair-care':
            return getAllEssentialHairCareFamilies();
        case 'oi':
            return getOiFamilies();
        case 'heart-of-glass':
            return getHeartOfGlassFamilies();
        default:
            return [];
    }
}