"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { HairTypeFiltersProps } from "@/types";

export default function HairTypeFilters({ tags }: HairTypeFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag') || 'all-products';


    const handleTagClick = (tagId: string) => {
        // If clicking 'all-products', go to base URL (which defaults to all-products)
        if (tagId === 'all-products') {
            router.push('/products', { scroll: false });
        } else {
            router.push(`/products?tag=${tagId}`, { scroll: false });
        }
    };

    return (
        <div className="w-full">
            
        </div>
    );
}