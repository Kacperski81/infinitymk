"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { HairTypeFiltersProps } from "@/types";
import IconTune from "@/components/svgs/icon-tune";
import IconCheveronDown from "@/components/svgs/icon-cheveron-down";

/**
 * HairTypeFilters - Persistent Filter UI Component
 * 
 * Provides responsive filter UI that remains accessible on all screen sizes:
 * 
 * Mobile (<768px):
 * - Compact button showing current selection
 * - Expands to full dropdown on tap
 * - Smooth height transition animation
 * - Touch-friendly tap targets (min 44px)
 * 
 * Tablet (768px-1024px):
 * - Horizontal scrollable pill buttons
 * - Native horizontal scroll for overflow
 * - Visual feedback on selection
 * 
 * Desktop (>1024px):
 * - Centered layout with all options visible
 * - Dot separators between options
 * - Hover states for interactivity
 * 
 * All variants use sticky positioning to remain visible during scroll.
 */
export default function HairTypeFilters({ tags }: HairTypeFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag') || 'all-products';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Detect when the filter becomes sticky using IntersectionObserver
    useEffect(() => {
        const filterSection = document.getElementById('filter-section');
        if (!filterSection) return;

        let sentinel = document.getElementById('sticky-sentinel');
        if (!sentinel) {
            sentinel = document.createElement('div');
            sentinel.id = 'sticky-sentinel';
            sentinel.style.height = '1px';
            sentinel.style.width = '100%';
            sentinel.style.pointerEvents = 'none';
            sentinel.setAttribute('aria-hidden', 'true');
            filterSection.parentElement?.insertBefore(sentinel, filterSection);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                const stuck = !entry.isIntersecting;
                setIsSticky(stuck);
                if (stuck) {
                    filterSection.classList.add('is-stuck');
                } else {
                    filterSection.classList.remove('is-stuck');
                }
            },
            { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-filter-menu]')) {
                setIsMobileMenuOpen(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMobileMenuOpen]);

    const handleTagClick = useCallback((tagId: string) => {
        if (tagId === 'all-products') {
            router.push('/products', { scroll: false });
        } else {
            router.push(`/products?tag=${tagId}`, { scroll: false });
        }
        setIsMobileMenuOpen(false);

        // Smooth scroll to results after filter change
        setTimeout(() => {
            const productsResults = document.getElementById('products-results');
            const filterSection = document.getElementById('filter-section');
            if (productsResults && filterSection) {
                const filterHeight = filterSection.offsetHeight;
                const targetPosition = productsResults.getBoundingClientRect().top + window.scrollY - filterHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        }, 100);
    }, [router]);

    const selectedTagLabel = tags.find((tag) => tag.id === selectedTag)?.label || "All Products";

    return (
        <div className="w-full pt-3">
            {/* Mobile view - persistent dropdown filter */}
            <div className="md:hidden px-4" data-filter-menu>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-(--main-450) border border-(--main-300) rounded-lg text-(--main-100) font-medium text-sm shadow-sm hover:bg-(--main-400) active:scale-[0.98] transition-all min-h-[44px]"
                    aria-expanded={isMobileMenuOpen}
                    aria-haspopup="listbox"
                    aria-label={`Filter by hair type. Currently: ${selectedTagLabel}`}
                >
                    <div className="flex items-center gap-3">
                        <IconTune />
                        <span className="leading-relaxed">{selectedTagLabel}</span>
                    </div>
                    <IconCheveronDown isOpen={isMobileMenuOpen} />
                </button>

                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        className="mt-2 bg-(--main-450) border border-(--main-300) rounded-lg shadow-md overflow-hidden"
                        role="listbox"
                        aria-label="Hair Type Filters"
                    >
                        {tags.map((tag) => {
                            const isSelected = selectedTag === tag.id;
                            return (
                                <button
                                    key={tag.id}
                                    onClick={() => handleTagClick(tag.id)}
                                    className={`w-full px-4 py-3 text-left text-sm font-medium border-b border-(--main-300) last:border-b-0 transition-colors ${
                                        isSelected
                                            ? "bg-(--main-100) text-(--main-800)"
                                            : "text-(--main-100) hover:bg-(--main-400)"
                                    }`}
                                >
                                    {tag.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tablet view */}
            <div className="hidden md:block lg:hidden px-6 py-2">
                <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                    {tags.map((tag) => {
                        const isSelected = selectedTag === tag.id;
                        return (
                            <button
                                key={tag.id}
                                onClick={() => handleTagClick(tag.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all ${
                                    isSelected
                                        ? "bg-(--main-100) text-(--main-800) border-(--main-100)"
                                        : "bg-(--main-450) text-(--main-200) border-(--main-300) hover:border-(--main-200) hover:text-(--main-100)"
                                }`}
                            >
                                {tag.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Desktop view */}
            <div className="hidden lg:block px-6">
                <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4">
                    {tags.map((tag, index) => {
                        const isSelected = selectedTag === tag.id;
                        return (
                            <div key={tag.id} className="flex items-center gap-2">
                                <button
                                    onClick={() => handleTagClick(tag.id)}
                                    className={`px-4 py-2 text-sm rounded-full border shadow-sm transition-all ${
                                        isSelected
                                            ? "bg-(--main-100) text-(--main-800) border-(--main-100) font-semibold"
                                            : "bg-(--main-450) text-(--main-200) border-(--main-300) hover:border-(--main-200) hover:text-(--main-100)"
                                    }`}
                                >
                                    {tag.label}
                                </button>
                                {index < tags.length - 1 && (
                                    <span className="text-(--main-300) text-lg">·</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
