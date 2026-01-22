import beautyServices from "@/data/beauty-services.json";
import { BeautyPriceList } from "@/types";

export function getBeautyServices(): BeautyPriceList {
    return beautyServices;
}