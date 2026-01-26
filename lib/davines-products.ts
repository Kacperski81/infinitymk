import essentialHairCare from "@/data/essential-hair-care.json";
import oiData from "@/data/oi.json";
import heartOfGlassData from "@/data/heart-of-glass.json";
import naturalTechData from "@/data/natural-tech.json";
import browseTags from "@/data/browse-tags.json";
import type { DavinesHairCareData, DavinesHairCareFamily, DavinesHairCareProduct, BrowseTags } from "@/types";

// Type for a flattened product with family info included
export type FlatProduct = DavinesHairCareProduct & {
    familyName: string;
    familyId: string;
};

// Type for search filters
export type ProductSearchFilters = {
    name?: string;
    type?: string;
    line?: string; // family/line name
};

// Get all product families from all JSON files
export function getAllFamilies(): DavinesHairCareData {
    return [
        ...(essentialHairCare as DavinesHairCareData),
        ...(oiData as DavinesHairCareData),
        ...(heartOfGlassData as DavinesHairCareData),
        ...(naturalTechData as DavinesHairCareData),
    ];
}

// Get all products as a flat list with family info included
export function getAllProducts(): FlatProduct[] {
    const families = getAllFamilies();
    const products: FlatProduct[] = [];

    for (const family of families) {
        for (const product of family.products) {
            products.push({
                ...product,
                familyName: family.family,
                familyId: family.id,
            });
        }
    }

    return products;
}

// Get all browse tags
export function getBrowseTags(): BrowseTags {
    return browseTags as BrowseTags;
}

// Get products filtered by tag ID (e.g., "all-products", "hair-blonde")
export function getProductsByTagId(tagId: string): FlatProduct[] {
    const allProducts = getAllProducts();
    const { typeToTagIds } = getBrowseTags();

    // If "all-products" is selected, return all products
    if (tagId === "all-products") {
        return allProducts;
    }

    // Filter products whose type maps to the selected tag
    return allProducts.filter((product) => {
        const productTagIds = typeToTagIds[product.type] || [];
        return productTagIds.includes(tagId);
    });
}

// Search products by name, type, and line with case-insensitive partial matching
export function searchProducts(filters: ProductSearchFilters): FlatProduct[] {
    let products = getAllProducts();

    const { name, type, line } = filters;

    // Filter by product name (case-insensitive partial match)
    if (name && name.trim() !== "") {
        const searchName = name.toLowerCase();
        products = products.filter((product) =>
            product.name.toLowerCase().includes(searchName)
        );
    }

    // Filter by product type (case-insensitive partial match)
    if (type && type.trim() !== "") {
        const searchType = type.toLowerCase();
        products = products.filter((product) =>
            product.type.toLowerCase().includes(searchType)
        );
    }

    // Filter by line/family name (case-insensitive partial match)
    if (line && line.trim() !== "") {
        const searchLine = line.toLowerCase();
        products = products.filter((product) =>
            product.familyName.toLowerCase().includes(searchLine)
        );
    }

    return products;
}

// Combined filter: filter by tag AND search query
export function filterProducts(
    tagId?: string,
    searchFilters?: ProductSearchFilters
): FlatProduct[] {
    let products: FlatProduct[];

    // First, filter by tag if provided
    if (tagId && tagId !== "") {
        products = getProductsByTagId(tagId);
    } else {
        products = getAllProducts();
    }

    // Then apply search filters if provided
    if (searchFilters) {
        const { name, type, line } = searchFilters;

        if (name && name.trim() !== "") {
            const searchName = name.toLowerCase();
            products = products.filter((product) =>
                product.name.toLowerCase().includes(searchName)
            );
        }

        if (type && type.trim() !== "") {
            const searchType = type.toLowerCase();
            products = products.filter((product) =>
                product.type.toLowerCase().includes(searchType)
            );
        }

        if (line && line.trim() !== "") {
            const searchLine = line.toLowerCase();
            products = products.filter((product) =>
                product.familyName.toLowerCase().includes(searchLine)
            );
        }
    }

    return products;
}

// Get unique product types from all products
export function getUniqueProductTypes(): string[] {
    const products = getAllProducts();
    const types = new Set<string>();
    for (const product of products) {
        types.add(product.type);
    }
    return Array.from(types).sort();
}

// Get unique family/line names from all products
export function getUniqueFamilyNames(): string[] {
    const families = getAllFamilies();
    return families.map((f) => f.family).sort();
}

export function filterProductsByFamily(family: DavinesHairCareFamily, tag: string): DavinesHairCareProduct[] {
    if (tag === "all-products" || !tag) {
        return family.products;
    }

    const tagMappings: Record<string, string[]> = {
        "hair-all": ["All hair types", "All hair types (daily use)"],
        "hair-blonde": ["Blonde hair"],
        "hair-colour": ["Coloured hair"],
        "hair-curl": ["Wavy or curly hair", "Wavy to very curly hair"],
        "hair-frizz": ["Frizzy and unruly hair", "Coarse or frizzy hair"],
        "hair-dry-damaged": ["Dry or damaged hair", "Dry or dehydrated hair", "Long or damaged hair"],
        "hair-fine-volume": ["Fine or limp hair", "Fine to medium hair"],
        "hair-fragile-loss": ["Fragile scalp and hair"],
        "skin-all": ["All skin types"],
    }

    const matchTypes = tagMappings[tag] || []

    return family.products.filter((product) =>
        matchTypes.some((type) => product.type.toLowerCase().includes(type.toLowerCase())),
    )
}