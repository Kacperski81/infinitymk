import HairGalleryImages from "@/data/hair-gallery-images.json";
import type { GalleryImage } from "@/types";

export function getHairGalleryImages(): GalleryImage[] {
    return HairGalleryImages;
}