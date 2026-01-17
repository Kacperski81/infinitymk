import { notFound } from "next/navigation";
import { getCollections, getCollectionBySlug } from "@/lib/collections";
import type { CollectionPageProps } from "@/types";
import BackButton from "@/components/products/back-button";
import DavinesProductCard from "@/components/products/davines-product-card";
import ProductFamilySection from "@/components/products/product-family-section";

export async function generateStaticParams() {
    const collections = getCollections();
    return collections.map((collection) => ({
        slug: collection.slug,
    }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);
    console.log('Collections', collection);
    if (!collection) {
        notFound();
    }

    return (
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">

            {/* Back button & Header */}
            <div className="">
                <BackButton />
            </div>
            <div className="max-w-7xl mx-auto">
                {collection.families.map((family) => (
                    <div key={family} className="mb-2">
                        <ProductFamilySection family={family} />

                    </div>
                ))}
            </div>
        </section>
    )
}