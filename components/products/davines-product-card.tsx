"use client"

import { useEffect, useState } from "react"
import IconCloseCircle from "@/components/svgs/close-circle"
import type { DavinesHairCareProduct, DavinesHairCareFamily } from "@/types"

type ExpandedProductCardProps = {
  product: DavinesHairCareProduct
  family: DavinesHairCareFamily
  onClose: () => void
}

export default function DavinesProductCard({ product, family, onClose }: ExpandedProductCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Trigger animation after mount
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true)
    })
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card-foreground/10 hover:bg-card-foreground/20 transition-colors"
          aria-label="Close modal"
        >
          <IconCloseCircle  />
        </button>

        <div className="grid md:grid-cols-2 md:items-center bg-card px-2">
          {/* Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
                {family.family} • {product.type}
              </p>
              <h2 className="text-2xl md:text-3xl font-light text-card-foreground">{product.name}</h2>
            </div>

            <p className="text-card-foreground/80 leading-relaxed">{product.full_description}</p>

            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">How to Use</p>
                  <p className="text-sm text-card-foreground/80 leading-relaxed">{product.usage}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Key Ingredient</p>
                  <p className="text-sm text-card-foreground/80 leading-relaxed">{family.info.active}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div>
                <p className="text-xl font-medium text-card-foreground">
                  {product.price}
                </p>
                <p className="text-sm text-muted-foreground">Available in-store</p>
              </div>

              {/* <button className="px-6 py-3 bg-card-foreground text-card rounded-sm text-sm font-medium tracking-wide hover:bg-card-foreground/90 transition-colors">
                Add to Cart
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
