import nailServices from "@/data/nail-services.json";
import { NailsServices } from "@/types";

export function getNailServices(): NailsServices[] {
    return nailServices;
}