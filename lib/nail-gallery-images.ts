import NailGalleryImages from "@/data/nail-gallery-images.json";
import type { GalleryImage } from "@/types";

export function getNailGalleryImages(): GalleryImage[] {
    return NailGalleryImages;
}