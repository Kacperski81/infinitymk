import type { DavinesHairCareProduct } from "@/types"

type ProductCardProps = {
  product: DavinesHairCareProduct
  familyName: string
}

export default function ProductCardSmall({ product, familyName }: ProductCardProps) {
  return (
    <div className="rounded-lg bg-(--main-800)/50 border border-(--main-700) flex flex-col h-full transition-all duration-300 hover:border-(--main-500) hover:bg-(--main-800)/70 group">
      {/* Product Image */}
      <div className="aspect-square relative bg-(--main-700)/50 rounded-t-lg overflow-hidden">
        {product.image ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
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
              <span className="text-xs">Image coming soon</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-2 justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-(--main-400)">{product.type}</p>
          <h4 className="text-base font-medium text-(--main-100) leading-tight">{product.name}</h4>
          <p className="text-xs text-(--main-400)">{familyName}</p>
          <p className="text-sm text-(--main-300) leading-relaxed line-clamp-2">{product.short_description}</p>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-(--main-700)">
          <span className="text-lg font-semibold text-(--main-100)">{product.price}</span>
          <span className="text-xs text-(--main-400)">Available in-store</span>
        </div>
      </div>
    </div>
  )
}
