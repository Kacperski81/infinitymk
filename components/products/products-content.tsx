"use client";

import { useState, useEffect, useCallback } from "react";
import HairType from "@/components/products/hair-type";

function getInitialTag(): string {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("tag") || "";
}

export default function ProductsContent() {
    const [selectedTag, setSelectedTag] = useState(getInitialTag);

    // Sync state if user navigates with browser back/forward
    useEffect(() => {
        const onPopState = () => {
            const params = new URLSearchParams(window.location.search);
            setSelectedTag(params.get("tag") || "");
        };
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const handleTagChange = useCallback((tagId: string) => {
        const newTag = tagId === "all-products" ? "" : tagId;
        setSelectedTag(newTag);

        // Update URL without navigation
        const url = newTag ? `/products?tag=${newTag}` : "/products";
        window.history.replaceState(null, "", url);

        // Scroll to the first row of products
        requestAnimationFrame(() => {
            const productsResults = document.getElementById("products-results");
            const filterSection = document.getElementById("filter-section");
            if (productsResults && filterSection) {
                const filterHeight = filterSection.offsetHeight;
                const targetPosition = productsResults.getBoundingClientRect().top + window.scrollY - filterHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    }, []);

    return (
        <HairType selectedTag={selectedTag} onTagChange={handleTagChange} />
    );
}
