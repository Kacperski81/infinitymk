"use client";

import { useSearchParams } from "next/navigation";
import HairType from "@/components/products/hair-type";

export default function ProductsContent() {
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag') || '';

    return (
        <HairType selectedTag={selectedTag} />
    );
}
