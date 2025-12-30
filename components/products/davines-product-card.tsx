import { getEssentialHairCare } from "@/lib/essential-hair-care";

export default function DavinesProductCard({ name }: { name: string }) {
    const davinesProducts = getEssentialHairCare(name);
    console.log("Davines products:", davinesProducts);

    return (

        <div className="space-y-4 md:space-y-6 lg:space-y-8 mx-auto">
            <p>{davinesProducts[0].info.active}</p>
            <p>{davinesProducts[0].info.props}</p>
            <p>{davinesProducts[0].info.prod}</p>
            <p>{davinesProducts[0].info.story}</p>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6 p-2">
                {davinesProducts[0].products.slice(0, 1).map((product) => {
                    return (
                        <div key={product.name} className="rounded-lg">
                            {/* Card */}
                            <div className="mx-auto xl:max-w-[1100px] grid xl:grid-cols-2 rounded-lg bg-(--card)">

                                {/* Product Image */}
                                <div className="w-full h-full p-2">
                                    <img className="w-full h-full object-cover object-center xl:rounded-l-lg overflow-hidden" src={product.image} />
                                </div>

                                {/* Product Details */}
                                <div className="flex flex-col justify-between p-8 lg:p-12">
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm uppercase tracking-wider mb-2 font-medium text--muted-foreground">{product.type}</p>
                                            <h3 className="text-4xl lg:text-5xl font-light tracking-tight text-foreground">{product.name}</h3>
                                        </div>

                                        <p className="text-lg leading-relaxed">
                                            {product.short_description}
                                        </p>

                                        <div className="pt-6 border-t">
                                            <p className="text-base leading-relaxed mb-6">
                                                {product.full_description}
                                            </p>
                                            <div className="space-y-2">
                                                <h4 className="text-sm uppercase tracking-wider font-medium">
                                                    HOW TO USE
                                                </h4>
                                                <p className="text-sm leading-relaxed">
                                                    {product.usage}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-8 mt-8 border-t">
                                        <div>
                                            <p className="text-3xl font-light">{product.price}</p>
                                            <p className="text-xs mt-1">Available in-store</p>
                                        </div>
                                        <button className="hidden px-4 py-2 min-w-[140px]">Add To Cart</button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    )
                })}
            </div>
        </div >
    )
}