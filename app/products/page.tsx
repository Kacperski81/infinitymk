"use client";

import { useState, Activity } from "react";
import ProductsHero from "@/components/products/products-hero";
import CollectionShowcase from "@/components/products/collection-showcase";
import Footer from "@/components/footer";
import type { BrowseMode } from "@/types";
import HairType from "@/components/products/hair-type";

export default function Products() {
    const [browseMode, setBrowseMode] = useState<BrowseMode>('hair-type');

    const handleBrowseModeChange = (mode: BrowseMode) => {
        setBrowseMode(mode);
        setTimeout(() => {
            document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100)
    }

    return (
        <main className="">
            <ProductsHero handleBrowseModeChange={handleBrowseModeChange} />
            <section id="products-section" className="py-16">
                {/* Browse mode indicator */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-4 justify-center items-center font-(family-name:--font-red-hat-text) mb-4 lg:mb-8">
                        <button
                            onClick={() => handleBrowseModeChange('collection')}
                            className={`px-4 py-2 text-sm tracking wide transition-all duration-300 rounded-sm ${browseMode === 'collection'
                                ? 'bg-(--main-200) text-(--main-800)'
                                : 'text-(--main-200) hover:text-(--main-50)'
                            }`}
                        >
                            By Collection
                        </button>
                        <span className="text-(--main-200)/50">|</span>
                        <button 
                            onClick={() => handleBrowseModeChange('hair-type')}
                            className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 rounded-sm ${browseMode === 'hair-type'
                                ? 'bg-(--main-200) text-(--main-800)'
                                : 'text-(--main-200) hover:text-(--main-50)'}`}
                        >
                            By Hair Type
                        </button>
                    </div>

                </div>

                <Activity mode={browseMode === 'hair-type' ? 'visible' : 'hidden'}>
                    <HairType />
                </Activity>
                <Activity mode={browseMode === 'collection' ? 'visible' : 'hidden'}>
                    <CollectionShowcase />
                </Activity>
            </section>
            <Footer />
        </main>
    )
}