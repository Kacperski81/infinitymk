"use client";

import { Activity } from "react";
import HairType from "@/components/products/hair-type";
import CollectionShowcase from "@/components/products/collection-showcase";
import type { BrowseMode } from "@/types";

type ProductsContentProps = {
    browseMode: BrowseMode;
    selectedTag: string;
    searchName: string;
    searchType: string;
    searchLine: string;
};

export default function ProductsContent({
    browseMode,
    selectedTag,
    searchName,
    searchType,
    searchLine,
}: ProductsContentProps) {
    return (
        <>
            <Activity mode={browseMode === 'hair-type' ? 'visible' : 'hidden'}>
                <HairType 
                    selectedTag={selectedTag}
                    searchName={searchName}
                    searchType={searchType}
                    searchLine={searchLine}
                />
            </Activity>
            <Activity mode={browseMode === 'collection' ? 'visible' : 'hidden'}>
                <CollectionShowcase />
            </Activity>
        </>
    );
}
