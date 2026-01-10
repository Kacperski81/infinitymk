import Link from "next/link";
import { getCollections } from "@/lib/collections";

export default function CollectionShowcase() {
    const collections = getCollections();

    return (
        // <section className="min-h-screen flex flex-col py-10 px-4 max-w-7xl mx-auto">
        <section className="max-w-7xl mx-auto">
            <div className="text-center mb-4 lg:mb-8 flex flex-col gap-4">
                <p className="text-3xl md:text-5xl font-light text-(--main-50) mb-4 text-balance font-(family-name:--font-lato) lg:leading-14">
                    Discover professional hair care crafted with Italian excellence and sustainable beauty.
                </p>
            </div>

            {/* Collection Cards Grid */}
            <div className="grow flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {collections.map((collection) => (
                        <Link
                            key={collection.slug}
                            href={{ pathname: `/products/${collection.slug}`}}
                            className="group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-end"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-(--main-900)/90 via-(--main-900)/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6 flex flex-col gap-3">
                                <h3 className="font-(family-name:--font-aboreto) text-2xl xl:text-3xl text-(--main-50) tracking-wide">
                                    {collection.name}
                                </h3>
                                <p className="font-(family-name:--font-lato) text-sm md:text-base text-(--main-100) leading-relaxed">
                                    {collection.description}
                                </p>
                                <span className="inline-flex items-center gap-2 mt-2 text-(--main-50) font-semibold text-sm tracking-wide uppercase group-hover:gap-3 transition-all duration-300">
                                    Explore Collection
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
