"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import type { DavinesHairCareProduct, DavinesHairCareFamily } from "@/types";

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
    // Use 250ms exit duration (shorter than entrance for better UX)
    setTimeout(onClose, 250)
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0
          bg-[var(--main-500)]/90
          dark:bg-[var(--main-900)]/95
          transition-opacity duration-200 ease-out
          motion-reduce:transition-none
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-6xl max-h-[90vh] overflow-y-auto
          rounded-2xl shadow-2xl
          bg-[var(--main-150)]
          dark:bg-[var(--main-800)]
          transition-all duration-250 ease-out
          motion-reduce:transition-none
          ${isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4'
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="
            absolute top-4 right-4 sm:top-6 sm:right-6 z-10 
            w-10 h-10 sm:w-11 sm:h-11
            flex items-center justify-center
            rounded-full
            bg-(--main-400)/80 
            text-(--main-100)
            backdrop-blur-sm 
            border border-(--main-300)/50
            transition-all duration-200 ease-out
            active:scale-95
            motion-reduce:transition-none
            focus:outline-none cursor-pointer
          "
          style={{ transform: "translate(0, 0)" }}
          aria-label="Close modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 md:items-start gap-8 md:gap-12 p-6 sm:p-10">
          {/* Image */}
          <div className="
            relative aspect-square rounded-xl overflow-hidden
            bg-[var(--main-300)]/20
            dark:bg-[var(--main-700)]/30
            border border-[var(--main-300)]/50
            dark:border-[var(--main-600)]/50
            md:sticky md:top-6
          ">
            {product.image ? (
              <Image src={product.image} alt={product.name} fill sizes="500px" quality={75} className="object-cover" />
            ) : (
              <div className="
                w-full h-full flex items-center justify-center
                text-[var(--main-400)]
                dark:text-[var(--main-500)]
              ">
                <div className="text-center p-6">
                  <div className="
                    w-20 h-20 mx-auto mb-4 rounded-full 
                    bg-[var(--main-400)]/20
                    dark:bg-[var(--main-500)]/20
                    flex items-center justify-center
                  ">
                    <svg className="
                      w-10 h-10 
                      text-[var(--main-400)]
                      dark:text-[var(--main-500)]
                    " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="
                    text-sm 
                    text-[var(--main-400)]
                    dark:text-[var(--main-500)]
                  ">Image coming soon</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-4 xl:space-y-8">
            {/* Header */}
            <div>
              {/* Product Type & Family - De-emphasized */}
              <p className="
                text-xs tracking-wider uppercase mb-3 
                font-medium
                text-[var(--main-500)]
                dark:text-[var(--main-400)]
              ">
                {family.family} • {product.type}
              </p>

              {/* Product Name - Primary emphasis */}
              <h2 className="
                text-xl md:text-2xl lg:text-3xl font-bold 
                text-[var(--main-900)]
                dark:text-[var(--main-100)]
                leading-tight mb-4
              ">{product.name}</h2>
            </div>

            {/* Description - Secondary emphasis */}
            <p className="
              text-base md:text-lg leading-relaxed
              text-[var(--main-800)]
              dark:text-[var(--main-200)]
            " style={{ lineHeight: '1.7' }}>{product.full_description}</p>

            {/* Details */}
            <div className="space-y-6">
              <div className="
                pt-6
                border-t border-[var(--main-300)]
                dark:border-[var(--main-600)]
              ">
                <p className="
                  text-xs tracking-wider uppercase mb-2 
                  font-semibold
                  text-[var(--main-500)]
                  dark:text-[var(--main-400)]
                ">How to Use</p>
                <p className="
                  text-sm md:text-base leading-relaxed
                  text-[var(--main-700)]
                  dark:text-[var(--main-300)]
                " style={{ lineHeight: '1.65' }}>{product.usage}</p>
              </div>

              <div className="
                pt-6
                border-t border-[var(--main-300)]
                dark:border-[var(--main-600)]
              ">
                <p className="
                  text-xs tracking-wider uppercase mb-2 
                  font-semibold
                  text-[var(--main-500)]
                  dark:text-[var(--main-400)]
                ">Key Ingredient</p>
                <p className="
                  text-sm md:text-base leading-relaxed
                  text-[var(--main-700)]
                  dark:text-[var(--main-300)]
                " style={{ lineHeight: '1.65' }}>{family.info.active}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="
              pt-6
              border-t border-[var(--main-300)]
              dark:border-[var(--main-600)]
            ">
              <p className="
                text-sm font-medium
                text-[var(--main-600)]
                dark:text-[var(--main-400)]
              ">Available in-store</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
