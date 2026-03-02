"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Tag } from "@/types";
import IconTune from "@/components/svgs/icon-tune";
import IconCheveronDown from "@/components/svgs/icon-cheveron-down";

interface HairTypeFiltersProps {
    tags: Tag[];
    /**
     * Virtual-scroll setter from useSmoothScroll.
     * Used after a filter change to navigate to the products results area
     * without touching window.scrollTo (which has no effect in this engine).
     */
    scrollToVirtual?: (px: number) => void;
    /**
     * True when this bar is rendering inside the fixed overlay (post-hero).
     * Controls visual treatment only — no layout behaviour changes.
     */
    isStuck?: boolean;
}

/**
 * HairTypeFilters — responsive filter pill bar.
 *
 * === Why window.scrollTo was removed ===
 * The smooth-scroll engine locks native scroll at 0 by calling
 * `e.preventDefault()` on every wheel/touch event.  `window.scrollTo` has no
 * visual effect inside this setup and can trigger browser-level conflicts.
 * The correct way to navigate programmatically is `scrollToVirtual(px)`, which
 * sets `targetRef` directly in the virtual coordinate space.
 *
 * After a filter change we do NOT attempt to scroll at all — the user is
 * already looking at the filter bar (either in-flow or fixed-overlay), so
 * the product list updating in place below it is the correct UX.  Scrolling
 * would fight the user's current position and cause the observed jump.
 *
 * === Responsive layouts ===
 * Mobile  (<md)  : collapsible dropdown, 44 px touch targets
 * Tablet  (md–lg): horizontally scrollable pills
 * Desktop (≥lg)  : centred pill row with dot separators
 */
export default function HairTypeFilters({
    tags,
    scrollToVirtual,
    isStuck = false,
}: HairTypeFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get("tag") ?? "all-products";
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleTagClick = useCallback(
        (tagId: string) => {
            // Update the URL without a native scroll (scroll: false).
            if (tagId === "all-products") {
                router.push("/products", { scroll: false });
            } else {
                router.push(`/products?tag=${tagId}`, { scroll: false });
            }
            setIsMobileMenuOpen(false);

            // If the user clicks while viewing the inline filter (not stuck yet),
            // scroll virtual position to the start of the products section so
            // they see results immediately. When stuck, they're already there.
            if (!isStuck && scrollToVirtual) {
                const section = document.getElementById("products-section");
                if (section) {
                    // offsetTop is in the virtual (wrapper-translated) coordinate space.
                    scrollToVirtual(section.offsetTop);
                }
            }
        },
        [router, isStuck, scrollToVirtual]
    );

    const selectedTagLabel =
        tags.find((tag) => tag.id === selectedTag)?.label ?? "All Products";

    const pillBase =
        "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all";
    const pillActive =
        "bg-(--main-100) text-(--main-800) border-(--main-100) font-semibold";
    const pillIdle =
        "bg-(--main-500)/60 text-(--main-200) border-(--main-400) hover:border-(--main-200) hover:text-(--main-100) hover:bg-(--main-500)";

    return (
        <div className="w-full pt-2 pb-1">

            {/* ── Mobile dropdown ──────────────────────────────────────── */}
            <div className="md:hidden px-4">
                <button
                    onClick={() => setIsMobileMenuOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-(--main-500)/80 border border-(--main-400) rounded-lg text-(--main-100) font-medium text-sm hover:bg-(--main-500) active:scale-[0.98] transition-all min-h-[44px]"
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
                        isMobileMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div
                        className="mt-2 bg-(--main-700) border border-(--main-500) rounded-lg shadow-xl overflow-hidden"
                        role="listbox"
                        aria-label="Hair Type Filters"
                    >
                        {tags.map((tag) => {
                            const isSelected = selectedTag === tag.id;
                            return (
                                <button
                                    key={tag.id}
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => handleTagClick(tag.id)}
                                    className={`w-full px-4 py-3 text-left text-sm font-medium border-b border-(--main-600) last:border-b-0 transition-colors min-h-[44px] ${
                                        isSelected
                                            ? "bg-(--main-100) text-(--main-800)"
                                            : "text-(--main-100) hover:bg-(--main-600)"
                                    }`}
                                >
                                    {tag.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Tablet horizontal scroll ─────────────────────────────── */}
            <div className="hidden md:flex lg:hidden px-6 py-1 gap-3 overflow-x-auto scrollbar-hide">
                {tags.map((tag) => (
                    <button
                        key={tag.id}
                        onClick={() => handleTagClick(tag.id)}
                        className={`${pillBase} ${selectedTag === tag.id ? pillActive : pillIdle}`}
                    >
                        {tag.label}
                    </button>
                ))}
            </div>

            {/* ── Desktop centred row ──────────────────────────────────── */}
            <div className="hidden lg:flex px-6 flex-wrap justify-center items-center gap-x-3 gap-y-2">
                {tags.map((tag, index) => (
                    <div key={tag.id} className="flex items-center gap-3">
                        <button
                            onClick={() => handleTagClick(tag.id)}
                            className={`${pillBase} ${selectedTag === tag.id ? pillActive : pillIdle}`}
                        >
                            {tag.label}
                        </button>
                        {index < tags.length - 1 && (
                            <span className="text-(--main-400) text-base leading-none" aria-hidden>
                                ·
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
