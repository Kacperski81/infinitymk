"use client";

import { useRouter } from "next/navigation";
import type { BrowseMode } from "@/types";

type BrowseModeToggleProps = {
    currentMode: BrowseMode;
};

export default function BrowseModeToggle({ currentMode }: BrowseModeToggleProps) {
    const router = useRouter();

    const handleModeChange = (mode: BrowseMode) => {
        // Update URL with new mode, clearing other filters when switching modes
        router.push(`/products?mode=${mode}`, { scroll: false });
    };

    return (
        <div className="flex gap-4 justify-center items-center font-(family-name:--font-red-hat-text) mb-4 lg:mb-8">
            <button
                onClick={() => handleModeChange('collection')}
                className={`px-4 py-2 text-sm tracking wide transition-all duration-300 rounded-sm ${
                    currentMode === 'collection'
                        ? 'bg-(--main-200) text-(--main-800)'
                        : 'text-(--main-200) hover:text-(--main-50)'
                }`}
            >
                By Collection
            </button>
            <span className="text-(--main-200)/50">|</span>
            <button
                onClick={() => handleModeChange('hair-type')}
                className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-sm ${
                    currentMode === 'hair-type'
                        ? 'bg-(--main-200) text-(--main-800)'
                        : 'text-(--main-200) hover:text-(--main-50)'
                }`}
            >
                By Hair Type
            </button>
        </div>
    );
}
