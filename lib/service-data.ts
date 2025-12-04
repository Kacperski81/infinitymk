import serviceData from  "@/data/service-data.json";
import type { ServiceData } from "@/types";

export function getServiceData(): ServiceData[] {
    return serviceData;
}