interface LogoProps {
    isOverlayVisible?: boolean;
    isAnimatingOut?: boolean;
}

function isMobile() {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
}

export default function Logo({ isOverlayVisible = false, isAnimatingOut = false }: LogoProps) {
    // Animation timing - should match LoadingOverlay split animation
    const exitDuration = isMobile() ? 0.7 : 1;
    const contentFadeDelay = 0.3; // Content fades first, then split + logo animate together
    
    // Calculate position and size based on animation state
    const isInCenter = isOverlayVisible && !isAnimatingOut;
    const shouldAnimate = isAnimatingOut;
    
    // Center position: 50% with offset for visual centering above progress bar
    // Final position: top of screen
    const topValue = isInCenter ? "50%" : "0px";
    const yTranslate = isInCenter ? "calc(-50% - 2.5rem)" : "0px";
    
    // Font size: larger in center, smaller at top
    const fontSize = isInCenter 
        ? "clamp(1.5rem, 4vw, 2.25rem)" 
        : "clamp(1.125rem, 2vw, 1.5rem)";

    return (
        <div
            className="fixed left-0 right-0 z-[70] flex justify-center"
            style={{
                top: topValue,
                transform: `translateY(${yTranslate})`,
                transition: shouldAnimate
                    ? `top ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${contentFadeDelay}s, transform ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${contentFadeDelay}s`
                    : "none",
            }}
        >
            <h2
                className="px-4 pt-1 font-logo tracking-wider logo-gradient"
                style={{
                    fontSize: fontSize,
                    transition: shouldAnimate
                        ? `font-size ${exitDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${contentFadeDelay}s`
                        : "none",
                }}
            >
                {"inf"}
                <span className="logo-background" style={{ color: "var(--main-50)" }}>
                    {"in"}
                </span>
                {"ity mk"}
            </h2>
        </div>
    );
}