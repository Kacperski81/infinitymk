"use client";

import { useSearchParams } from "next/navigation";
import HairType from "@/components/products/hair-type";

interface ProductsContentProps {
    scrollY?: number;
}

export default function ProductsContent({ scrollY = 0 }: ProductsContentProps) {
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag') || '';

    return (
        <HairType selectedTag={selectedTag} scrollY={scrollY} />
    );
}
