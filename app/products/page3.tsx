import ProductsHero from "@/components/products/products-hero";
import Footer from "@/components/footer";
import BrowseModeToggle from "@/components/products/browse-mode-toggle";
import ProductsContent from "@/components/products/products-content";
import type { BrowseMode } from "@/types";
import DavinesProductCard from "@/components/products/davines-product-card";

type ProductsPageProps = {
    searchParams: Promise<{
        mode?: string;
        tag?: string;
        name?: string;
        type?: string;
        line?: string;
    }>;
};

export default async function Products({ searchParams }: ProductsPageProps) {
    const params = await searchParams;

    // Get browse mode from URL, default to 'hair-type'
    const browseMode: BrowseMode = (params.mode === 'collection' || params.mode === 'hair-type')
        ? params.mode
        : 'hair-type';

    // Get filter params for HairType
    const tag = params.tag || '';
    const name = params.name || '';
    const type = params.type || '';
    const line = params.line || '';

    return (
        <main className="">
            <ProductsHero browseMode={browseMode} />
            <section id="products-section" className="py-16">
                {/* Browse mode indicator */}
                {/* <div className="max-w-7xl mx-auto">
                    <BrowseModeToggle currentMode={browseMode} />
                </div> */}

                <ProductsContent
                    browseMode={browseMode}
                    selectedTag={tag}
                    searchName={name}
                    searchType={type}
                    searchLine={line}
                />
            </section>
            <Footer />
        </main>
    );
}