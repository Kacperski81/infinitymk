import type { DavinesHairCareProduct } from "@/types"

type ProductCardProps = {
    product: DavinesHairCareProduct
    familyName: string
    onClick?: () => void
}

export default function SmallProductCard({ product, familyName, onClick }: ProductCardProps) {
    return (
        <div className="group text-left w-full cursor-pointer" onClick={onClick}>
            {/* Product Image */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] mb-2 sm:mb-3 overflow-hidden rounded-lg bg-(--main-400)/50">
                {product.image ? (
                    <>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-(--main-50)/0 group-hover:bg-(--main-50)/5 transition-colors duration-500" />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-(--main-400)">
                        <div className="text-center p-4">
                            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-(--main-600)/50 flex items-center justify-center">
                                <svg className="w-8 h-8 text-(--main-400)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span className="text-[10px] sm:text-xs">Image coming soon</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="space-y-0.5 sm:space-y-1">
                <p className="text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] uppercase text-(--main-200)">
                    {product.type}
                </p>
                <h4 className="text-xs sm:text-sm font-medium text-(--main-50) group-hover:text-(--main-100) transition-colors leading-tight">
                    {product.name}
                </h4>
                <p className="text-[10px] sm:text-xs text-(--main-200) leading-relaxed line-clamp-2">
                    {product.short_description}
                </p>
            </div>
        </div>
    )
}