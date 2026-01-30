"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { HairTypeFiltersProps } from "@/types";
import IconTune from "@/components/svgs/icon-tune";
import IconCheveronDown from "../svgs/icon-cheveron-down";

export default function HairTypeFilters({ tags }: HairTypeFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag') || 'all-products';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Detect when the filter becomes sticky by checking the parent's position
    useEffect(() => {
        const filterSection = document.getElementById('filter-section');
        if (!filterSection) return;

        const checkSticky = () => {
            const rect = filterSection.getBoundingClientRect();
            // When top is 0 (or very close), the element is in sticky position
            const sticky = rect.top <= 0;
            setIsSticky(sticky);

            // Apply padding to the parent filter-section when sticky (mobile/tablet only)
            if (window.innerWidth < 1024) { // lg breakpoint
                filterSection.style.paddingTop = sticky ? '3rem' : '';
            } else {
                filterSection.style.paddingTop = sticky ? '3rem' : '';
            }
        };

        window.addEventListener('scroll', checkSticky, { passive: true });
        window.addEventListener('resize', checkSticky, { passive: true });
        checkSticky(); // Check initial state

        return () => {
            window.removeEventListener('scroll', checkSticky);
            window.removeEventListener('resize', checkSticky);
        };
    }, []);


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

            {/* Tablet view filters */}
            <div className="hidden md:block lg:hidden">
                <div className="relative">
                    <div className="flex gap-2 overflow-x-auto px-6 py-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {tags.map((tag) => {
                            const isSelected = selectedTag === tag.id;
                            return (
                                <button key={tag.id} onClick={() => handleTagClick(tag.id)} className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 min-h-[40px] ${isSelected ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-secondary/50 text-foreground border-border hover:border-primary/50 hover:bg-secondary"}`}>
                                    {tag.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Desktop view filters */}
            <div className="hidden lg:block">
                <div className="max-w-8xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        {tags.map((tag, index) => {
                            const isSelected = selectedTag === tag.id;
                            return (
                                <div key={tag.id} className="flex items-center gap-2">
                                    <button onClick={() => handleTagClick(tag.id)} className={`px-4 py-2 text-xs sm:text-sm rounded-full border transition-all duration-200 whitespace-nowrap ${selectedTag === tag.id
                                        ? 'bg-(--main-100) text-(--main-800) border-(--main-100) font-medium'
                                        : 'bg-transparent text-(--main-200) border-(--main-300) hover:border-(--main-200) hover:text-(--main-100)'
                                        }`}>
                                        {tag.label}
                                    </button>
                                    {/* separator between buttons */}
                                    {index < tags.length - 1 && (<span className="text-border text-lg select-none">·</span>)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}