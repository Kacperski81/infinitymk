import { notFound } from "next/navigation";
import { getCollectionBySlug } from "@/lib/collections";
import type { CollectionPageProps } from "@/types";
import BackButton from "@/components/products/back-button";

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);
    
    if (!collection) {
        notFound();
    }

    return (
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">

            {/* Back button & Header */}
            <div className="">
                <BackButton />
            </div>
        </section>
    )
}