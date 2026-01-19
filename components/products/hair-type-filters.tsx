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
        <div className="max-w-7xl mx-auto space-y-4">
            {/* Hair Type Tag Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-4">
                {tags.map((tag, index) => (
                    <div key={tag.id} className="flex items-center">
                        <button
                            onClick={() => handleTagClick(tag.id)}
                            className={`px-4 py-2 text-xs sm:text-sm rounded-full border transition-all duration-200 whitespace-nowrap ${selectedTag === tag.id
                                    ? 'bg-(--main-100) text-(--main-800) border-(--main-100) font-medium'
                                    : 'bg-transparent text-(--main-200) border-(--main-300) hover:border-(--main-200) hover:text-(--main-100)'
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
