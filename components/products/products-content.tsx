"use client";

import { useSearchParams } from "next/navigation";
import HairType from "@/components/products/hair-type";

interface ProductsContentProps {
    scrollY?: number;
    /** Programmatic virtual-scroll setter from useSmoothScroll. */
    scrollToVirtual?: (px: number) => void;
    /**
     * When true, render only the filter bar (used by the fixed sticky overlay
     * rendered outside the translated wrapper in products/page.tsx).
     */
    filtersOnly?: boolean;
    /** Forwarded from the page — true once scrollY has passed the hero. */
    isStuck?: boolean;
}

export default function ProductsContent({
    scrollY = 0,
    scrollToVirtual,
    filtersOnly = false,
    isStuck = false,
}: ProductsContentProps) {
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get("tag") ?? "";

    return (
        <HairType
            selectedTag={selectedTag}
            scrollY={scrollY}
            scrollToVirtual={scrollToVirtual}
            filtersOnly={filtersOnly}
            isStuck={isStuck}
        />
    );
}
