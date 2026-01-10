"use client"

import React, { useState, useLayoutEffect, useCallback, useRef, ReactNode, Children, cloneElement, isValidElement } from "react";
import LeftArrow from "@/components/svgs/left-arrow";
import RightArrow from "@/components/svgs/right-arrow";

interface FlexibleCarouselProps {
    /** 
     * React children to render as carousel items. 
     * Each child will become a slide in the carousel.
     */
    children: ReactNode;
    /** 
     * Enable infinite looping by cloning first and last slides. 
     * @default true
     */
    loop?: boolean;
    /** 
     * Show navigation arrows. 
     * @default true
     */
    showArrows?: boolean;
    /** 
     * Show dot indicators. 
     * @default false
     */
    showDots?: boolean;
    /** 
     * Auto-play interval in milliseconds. Set to 0 to disable. 
     * @default 0
     */
    autoPlay?: number;
    /** 
     * Custom class name for the carousel container. 
     */
    className?: string;
    /** 
     * Custom class name for each slide wrapper. 
     */
    slideClassName?: string;
    /** 
     * Transition duration in milliseconds. 
     * @default 500
     */
    transitionDuration?: number;
    /** 
     * Custom left arrow component. 
     */
    leftArrow?: ReactNode;
    /** 
     * Custom right arrow component. 
     */
    rightArrow?: ReactNode;
    /**
     * Initial slide index (0-based).
     * @default 0
     */
    initialIndex?: number;
    /**
     * Callback fired when the active slide changes.
     */
    onSlideChange?: (index: number) => void;
}

export default function FlexibleCarousel({
    children,
    loop = true,
    showArrows = true,
    showDots = false,
    autoPlay = 0,
    className = "",
    slideClassName = "",
    transitionDuration = 500,
    leftArrow,
    rightArrow,
    initialIndex = 0,
    onSlideChange,
}: FlexibleCarouselProps) {
    const childArray = Children.toArray(children);
    const totalSlides = childArray.length;

    // For infinite loop, we clone the first and last slides
    const slides = loop
        ? [childArray[totalSlides - 1], ...childArray, childArray[0]]
        : childArray;

    const [isTransitionDisabled, setIsTransitionDisabled] = useState<boolean>(false);
    // When looping, start at index 1 (first real slide); otherwise start at initialIndex
    const [selectedIndex, setSelectedIndex] = useState<number>(loop ? initialIndex + 1 : initialIndex);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get the real index (accounting for cloned slides in loop mode)
    const getRealIndex = useCallback((index: number): number => {
        if (!loop) return index;
        if (index === 0) return totalSlides - 1;
        if (index === slides.length - 1) return 0;
        return index - 1;
    }, [loop, totalSlides, slides.length]);

    // Navigation
    const navigate = useCallback((direction: 1 | -1) => {
        if (!loop) {
            if (selectedIndex <= 0 && direction === -1) return;
            if (selectedIndex >= totalSlides - 1 && direction === 1) return;
        }
        const newIndex = selectedIndex + direction;
        setSelectedIndex(newIndex);
    }, [selectedIndex, totalSlides, loop]);

    const goToSlide = useCallback((index: number) => {
        setSelectedIndex(loop ? index + 1 : index);
    }, [loop]);

    // Measure container width
    const measureContainer = useCallback(() => {
        const el = containerRef.current;
        if (el) {
            setContainerWidth(el.offsetWidth);
        }
    }, []);

    // Get carousel transform style
    const getCarouselStyle = () => ({
        transform: `translateX(-${containerWidth * selectedIndex}px)`,
        transition: isTransitionDisabled ? 'none' : `transform ${transitionDuration}ms ease-in-out`,
    });

    // Disable transition temporarily for seamless loop
    const toggleTransition = useCallback(() => {
        setIsTransitionDisabled(true);
        setTimeout(() => {
            setIsTransitionDisabled(false);
        }, 50);
    }, []);

    // Handle transition end for infinite loop
    const handleTransitionEnd = useCallback(() => {
        if (!loop) return;

        if (selectedIndex === 0) {
            toggleTransition();
            setSelectedIndex(slides.length - 2);
        }
        if (selectedIndex === slides.length - 1) {
            toggleTransition();
            setSelectedIndex(1);
        }

        // Fire callback with real index
        onSlideChange?.(getRealIndex(selectedIndex));
    }, [loop, selectedIndex, slides.length, toggleTransition, onSlideChange, getRealIndex]);

    // Resize observer for responsive behavior
    useLayoutEffect(() => {
        measureContainer();

        const roTarget = containerRef.current;
        if (!roTarget) return;

        const ro = new ResizeObserver(() => {
            measureContainer();
        });
        ro.observe(roTarget);

        const onOrientation = () => measureContainer();
        window.addEventListener('orientationchange', onOrientation);

        return () => {
            ro.disconnect();
            window.removeEventListener('orientationchange', onOrientation);
        };
    }, [measureContainer]);

    // Auto-play functionality
    React.useEffect(() => {
        if (autoPlay <= 0) return;

        const interval = setInterval(() => {
            navigate(1);
        }, autoPlay);

        return () => clearInterval(interval);
    }, [autoPlay, navigate]);

    // Render each slide
    const renderSlide = (child: ReactNode, index: number) => (
        <div
            key={index}
            className={`min-w-full flex-shrink-0 ${slideClassName}`}
        >
            {child}
        </div>
    );

    // Calculate current real index for dots
    const currentRealIndex = getRealIndex(selectedIndex);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Slides Track */}
            <div
                className="flex w-full h-full"
                style={getCarouselStyle()}
                onTransitionEnd={handleTransitionEnd}
            >
                {slides.map((slide, index) => renderSlide(slide, index))}
            </div>

            {/* Navigation Arrows */}
            {showArrows && (
                <>
                    <button
                        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 cursor-pointer hover:bg-black/20 focus-visible:bg-black/20 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                        onClick={() => navigate(-1)}
                        aria-label="Previous slide"
                    >
                        {leftArrow || <LeftArrow />}
                    </button>
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 cursor-pointer hover:bg-black/20 focus-visible:bg-black/20 transition-colors duration-300 w-10 h-10 rounded-full flex items-center justify-center"
                        onClick={() => navigate(1)}
                        aria-label="Next slide"
                    >
                        {rightArrow || <RightArrow />}
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {showDots && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {childArray.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                currentRealIndex === index
                                    ? 'bg-white'
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
