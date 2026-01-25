"use client";

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import type { MobileGalleryModalProps } from "@/types";
import IconCloseCircle from "../svgs/close-circle";
import LeftArrow from "../svgs/left-arrow";
import RightArrow from "../svgs/right-arrow";

export default function MobileGalleryModal({ isOpen, onClose, selectedIndex, pictures }: MobileGalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex)
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [dragOffset, setDragOffset] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [enableTransition, setEnableTransition] = useState(false)
    const [isSliderEnd, setIsSliderEnd] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Minimum swipe distance to trigger navigation
    const minSwipeDistance = 50

    // Measure container width for carousel calculations
    const measureContainer = useCallback(() => {
        if (carouselRef.current) {
            const width = carouselRef.current.offsetWidth
            setContainerWidth(width)
        }
    }, [])

    // Reset state when modal opens with new image
    useEffect(() => {
        if (isOpen) {
            // Disable transitions on open to show selected image immediately
            setEnableTransition(false)
            setCurrentIndex(selectedIndex)
            setLoadedImages(new Set())
            setDragOffset(0)
            setIsAnimating(false)
            document.body.style.overflow = "hidden"
            // Measure after modal renders, then enable transitions for navigation
            requestAnimationFrame(() => {
                measureContainer()
                // Enable transitions after initial render so navigation animates smoothly
                requestAnimationFrame(() => {
                    setEnableTransition(true)
                })
            })
        } else {
            document.body.style.overflow = ""
            setEnableTransition(false)
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen, selectedIndex, measureContainer])

    // Measure container on resize
    useLayoutEffect(() => {
        if (!isOpen) return

        measureContainer()

        const handleResize = () => measureContainer()
        window.addEventListener("resize", handleResize)
        window.addEventListener("orientationchange", handleResize)

        // Also use ResizeObserver for more accurate measurements
        const ro = new ResizeObserver(() => measureContainer())
        if (carouselRef.current) {
            ro.observe(carouselRef.current)
        }

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("orientationchange", handleResize)
            ro.disconnect()
        }
    }, [isOpen, measureContainer])

    // Handle escape key
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen, onClose])

    // Toggle transition off temporarily for instant jumps (infinite scroll pattern)
    const toggleTransition = useCallback(() => {
        setIsSliderEnd(true)
        setTimeout(() => {
            setIsSliderEnd(false)
        }, 50)
    }, [])

    // Navigate to specific index with animation
    const navigateTo = useCallback(
        (newIndex: number, instant = false) => {
            if (isAnimating && !instant) return

            // Clamp index to valid range (no wrap-around)
            if (newIndex < 0 || newIndex >= pictures.length) return

            if (newIndex === currentIndex && !instant) return

            // If instant (e.g., thumbnail tap), disable transition
            if (instant) {
                toggleTransition()
            }

            setIsAnimating(!instant)
            setCurrentIndex(newIndex)
        },
        [currentIndex, pictures.length, isAnimating, toggleTransition]
    )

    // Handle arrow key navigation
    useEffect(() => {
        function handleKeyNav(event: KeyboardEvent) {
            if (isAnimating) return
            if (event.key === "ArrowLeft") {
                navigateTo(currentIndex - 1, false)
            } else if (event.key === "ArrowRight") {
                navigateTo(currentIndex + 1, false)
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyNav)
        }

        return () => {
            document.removeEventListener("keydown", handleKeyNav)
        }
    }, [isOpen, currentIndex, isAnimating])

    // Handle backdrop tap to close
    const handleOverlayClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose()
            }
        },
        [onClose]
    )

    // Touch handlers for swipe navigation with drag feedback
    const onTouchStart = (e: React.TouchEvent) => {
        if (isAnimating) return
        setTouchStart(e.targetTouches[0].clientX)
        setDragOffset(0)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        if (touchStart === null || isAnimating) return
        const currentX = e.targetTouches[0].clientX
        const diff = currentX - touchStart

        // Add edge resistance at boundaries
        const isAtStart = currentIndex === 0 && diff > 0
        const isAtEnd = currentIndex === pictures.length - 1 && diff < 0
        
        if (isAtStart || isAtEnd) {
            // Apply resistance (reduce drag distance at edges)
            setDragOffset(diff * 0.3)
        } else {
            setDragOffset(diff)
        }
    }

    const onTouchEnd = () => {
        if (touchStart === null) return

        const distance = dragOffset
        const threshold = containerWidth * 0.2 // 20% of container width

        if (Math.abs(distance) > Math.max(minSwipeDistance, threshold)) {
            if (distance < 0 && currentIndex < pictures.length - 1) {
                // Swipe left - next image (only if not at end)
                navigateTo(currentIndex + 1, false)
            } else if (distance > 0 && currentIndex > 0) {
                // Swipe right - previous image (only if not at start)
                navigateTo(currentIndex - 1, false)
            }
        }

        // Reset drag state
        setTouchStart(null)
        setDragOffset(0)
    }

    // Handle transition end
    const handleTransitionEnd = () => {
        setIsAnimating(false)
    }

    // Track loaded images
    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => new Set(prev).add(index))
    }

    // Calculate carousel transform
    const getCarouselStyle = (): React.CSSProperties => {
        const baseOffset = -currentIndex * containerWidth
        const totalOffset = baseOffset + dragOffset

        // Determine if transition should be applied:
        // - No transition during drag (dragOffset !== 0)
        // - No transition on initial open (enableTransition === false)
        // - No transition when isSliderEnd is true (instant boundary jump or thumbnail click)
        // - Smooth transition only when navigating after modal is open via arrows/swipe
        const shouldTransition = enableTransition && dragOffset === 0 && !isSliderEnd

        return {
            transform: `translateX(${totalOffset}px)`,
            transition: shouldTransition
                ? "transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)"
                : "none",
        }
    }
    if (!isOpen || pictures.length === 0) return null;

    return (
        <>
            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 bg-main-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={handleOverlayClick}
                aria-hidden="true"
            />
            <div ref={modalRef} role="dialog" aria-modal="true" aria-label="Image gallery viewer" className={`fixed inset-y-15 inset-x-2 z-50 flex flex-col rounded-2xl shadow-2xl transition-all duration-300 ease-out bg-main-50/80 backdrop-blur-[10px] border border-main-100/60 
                ${isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                }`}
            >
                {/* Header with close button */}
                <div className="flex items-center justify-between p-4 ">
                    <span className="text-sm font-medium text-main-600">
                        {currentIndex + 1} / {pictures.length}
                    </span>
                    <button
                        onClick={onClose}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-main-200/60 active:bg-main-300/60 transition-colors text-main-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-400"
                        aria-label="Close gallery"
                    >
                        <IconCloseCircle />
                    </button>
                </div>
                {/* Carousel container */}
                <div
                    ref={carouselRef}
                    className="relative flex-1 overflow-hidden"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Carousel track */}
                    <div className="flex h-full w-full" style={getCarouselStyle()} onTransitionEnd={handleTransitionEnd}>
                        {pictures.map((picture, index) => (
                            <div
                                key={picture.id}
                                className="min-w-full h-full flex items-center justify-center p-4"
                                style={{ width: containerWidth || "100%" }}
                            >
                                {/* Loading skeleton */}
                                {!loadedImages.has(index) && (
                                    <div className="absolute inset-4 bg-main-200/50 rounded-xl animate-pulse" />
                                )}

                                {/* High-resolution image */}
                                <img
                                    src={picture.imageUrl || "/placeholder.svg"}
                                    alt={picture.alt}
                                    onLoad={() => handleImageLoad(index)}
                                    draggable={false}
                                    className={` object-contain rounded-lg select-none transition-opacity duration-300 ${loadedImages.has(index) ? "opacity-100" : "opacity-0"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                    {/* Carousel navigation */}
                    {pictures.length > 1 && (
                        <>
                            {currentIndex > 0 && (
                                <button
                                    onClick={() => navigateTo(currentIndex - 1, false)}
                                    disabled={isAnimating}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-main-800/70 text-main-50 hover:bg-main-800/90 active:bg-main-900/90 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-200"
                                    aria-label="Previous image"
                                >
                                    <LeftArrow />
                                </button>
                            )}
                            {currentIndex < pictures.length - 1 && (
                                <button
                                    onClick={() => navigateTo(currentIndex + 1, false)}
                                    disabled={isAnimating}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-main-800/70 text-main-50 hover:bg-main-800/90 active:bg-main-900/90 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-200"
                                    aria-label="Next image"
                                >
                                    <RightArrow />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}