"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { HairTypeFiltersProps } from "@/types";
import IconTune from "@/components/svgs/icon-tune";
import IconCheveronDown from "../svgs/icon-cheveron-down";

export default function HairTypeFilters({ tags }: HairTypeFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag') || 'all-products';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const handleTagClick = (tagId: string) => {
        // If clicking 'all-products', go to base URL (which defaults to all-products)
        if (tagId === 'all-products') {
            router.push('/products', { scroll: false });
        } else {
            router.push(`/products?tag=${tagId}`, { scroll: false });
        }
        setIsMobileMenuOpen(false);

        // Scroll to products results after filter change (below sticky filter)
        setTimeout(() => {
            const productsResults = document.getElementById('products-results');
            const filterSection = document.getElementById('filter-section');
            if (productsResults && filterSection) {
                const filterHeight = filterSection.offsetHeight;
                const targetPosition = productsResults.getBoundingClientRect().top + window.scrollY - filterHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }, 100);
    };

    const selectedTagLabel = tags.find((tag) => tag.id === selectedTag)?.label || "All Products";

    const hasActiveFilter = selectedTag !== 'all-products';

    return (
        <div className="w-full">

            {/* Mobile view filters */}
            <div className="md:hidden">
                <div className="flex items-center justify-between gap-3 px-2 max-w-[80vw]">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`flex-1 flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border text-foreground font-medium text-sm transition-all duration-200 active:scale-[0.98] ${isMobileMenuOpen && "ring-2 ring-primary/20"}`} aria-expanded={isMobileMenuOpen} aria-haspopup="listbox">
                        <div className="flex items-center gap-2">
                            <IconTune />
                            <span>{selectedTagLabel}</span>
                        </div>
                        <IconCheveronDown isOpen={isMobileMenuOpen} />
                    </button>

                    {/* Clear filter button */}
                    {/* {hasActiveFilter && (
                        <button>X</button>
                    )} */}
                </div>

                {/* Mobile Dropdown Menu */}
                <div className={`overflow-hidden transition-all duration-300 ease-out ${isMobileMenuOpen ? "max-h-[60vh] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="max-h-[50vh] overflow-y-auto overscroll-contain rounded-xl shadow-lg overflow-hidden" role="listbox" aria-label="Hair Type Filters">
                        {tags.map((tag) => {
                            const isSelected = selectedTag === tag.id;
                            return (
                                <button key={tag.id} onClick={() => handleTagClick(tag.id)} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-medium transition-colors duration-150 border-b border-(--main-300) last:border-b-0 min-h-[44px] ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-card text-primary-foreground hover:bg-accent active:bg-accent'}`}>
                                    <span>{tag.label}</span>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
}