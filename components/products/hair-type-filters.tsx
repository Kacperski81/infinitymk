"use client";

import { useState, useEffect } from "react";
import type { HairTypeFiltersProps } from "@/types";
import IconTune from "@/components/svgs/icon-tune";
import IconCheveronDown from "@/components/svgs/icon-cheveron-down";

export default function HairTypeFilters({ tags, selectedTag, onTagChange }: HairTypeFiltersProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    // Detect when the filter becomes sticky
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

    const handleTagClick = (tagId: string) => {
        onTagChange?.(tagId);
        setIsMobileMenuOpen(false);
    };

    const selectedTagLabel = tags.find((tag) => tag.id === selectedTag)?.label || "All Products";

    return (
        <div className="w-full pt-3">
            {/* Mobile view */}
            <div className="md:hidden px-4">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-(--secondary) border border-(--border) rounded-lg text-(--secondary-foreground) font-medium text-sm shadow-sm hover:bg-(--muted) active:scale-95 transition-all"
                    aria-expanded={isMobileMenuOpen}
                    aria-haspopup="listbox"
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
                        className="mt-2 bg-(--secondary) border border-(--border) rounded-lg shadow-md overflow-y-auto max-h-60"
                        role="listbox"
                        aria-label="Hair Type Filters"
                    >
                        {tags.map((tag) => {
                            const isSelected = selectedTag === tag.id;
                            return (
                                <button
                                    key={tag.id}
                                    onClick={() => handleTagClick(tag.id)}
                                    className={`w-full px-4 py-3 text-left text-sm font-medium border-b border-(--border) last:border-b-0 transition-colors ${
                                        isSelected
                                            ? "bg-(--primary) text-(--primary-foreground)"
                                            : "text-(--secondary-foreground) hover:bg-(--muted)"
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
                                        ? "bg-(--primary) text-(--primary-foreground) border-(--primary)"
                                        : "bg-(--secondary) text-(--secondary-foreground) border-(--border) hover:border-(--muted-foreground) hover:text-(--foreground)"
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
                                            ? "bg-(--primary) text-(--primary-foreground) border-(--primary) font-semibold"
                                            : "bg-(--secondary) text-(--secondary-foreground) border-(--border) hover:border-(--muted-foreground) hover:text-(--foreground)"
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