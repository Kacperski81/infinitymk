import { getBrowseTags } from "@/lib/browse-tabs";

export default function HairType() {
    const tags = getBrowseTags();
    return (
        <section id="hair-type" className="space-y-4 px-1">
            <div className="text-center">
                <p className="text-sm tracking-[0.3em] uppercase text-(--main-200) mb-4">Shop by Hair Type</p>
                <h2 className="text-3xl md:text-4xl font-light text-(--main-50) mb-2 text-balance">Find your perfect match</h2>
                <p className="text-(--main-200) max-w-xl mx-auto">
                    Select your hair type to discover products formulated for your specific needs.
                </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {tags.map((tag,index) => (
                    <div key={tag.id} className="flex items-center">
                        <button>
                            {tag.label}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    )
}