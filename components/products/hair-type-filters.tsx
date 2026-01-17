"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { tag } from "@/types";

type HairTypeFiltersProps = {
    tags: tag[];
};

export default function HairTypeFilters({ tags }: HairTypeFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Default to 'all-products' when no tag is selected
    const selectedTag = searchParams.get('tag') || 'all-products';

    // Handle tag button click - update URL with selected tag
    const handleTagClick = (tagId: string) => {
        // If clicking 'all-products', go to base URL (which defaults to all-products)
        if (tagId === 'all-products') {
            router.push('/products', { scroll: false });
        } else {
            router.push(`/products?tag=${tagId}`, { scroll: false });
        }
    };

    // Handle clear all filters
    const handleClearFilters = () => {
        router.push('/products', { scroll: false });
    };

    // Check if any filters are active
    const hasActiveFilters = !!selectedTag;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Hair Type Tag Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
                {tags.map((tag, index) => (
                    <div key={tag.id} className="flex items-center">
                        <button
                            onClick={() => handleTagClick(tag.id)}
                            className={`px-3 py-1.5 text-sm tracking-wide transition-all duration-200 ${selectedTag === tag.id
                                    ? 'text-(--main-50) font-medium underline underline-offset-4 decoration-2)'
                                    : 'text-(--main-200) hover:text-(--main-50)'
                                }`}
                        >
                            {tag.label}
                        </button>
                        {/* separator between buttons */}
                        {index < tags.length - 1 && <span className="text-xl text-(--main-200) mx-1">·</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
