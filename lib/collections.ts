import collections from "@/data/collections.json";
import type { Collection } from "@/types";

export function getCollections(): Collection[] {
    return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
    return collections.find(collection => collection.slug === slug);
}
