export default function Logo({ isOverlayVisible = false }: { isOverlayVisible?: boolean }) {

    if (isOverlayVisible) {
        const topValue = isOverlayVisible ? "50%" : "0px";
        const yTranslate = isOverlayVisible ? "calc(-50% - 2.5rem)" : "0px";
        return (
            <div
                className="fixed left-1/2 z-[70]"
                style={{
                    top: topValue,
                    transform: `translateX(-50%) translateY(${yTranslate})`,
                    transition: isOverlayVisible
                        ? "none"
                        : "top 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
            >
                <h2
                    className="px-4 pt-1 font-logo tracking-wider logo-gradient"
                    style={{
                        fontSize: isOverlayVisible ? "clamp(1.5rem, 4vw, 2.25rem)" : "",
                        transition:
                            "font-size 1s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                >
                    {"inf"}
                    <span className="logo-background" style={{ color: "var(--main-50)" }}>
                        {"in"}
                    </span>
                    {"ity mk"}
                </h2>
            </div>
        )
    }

    return (
        <div className="fixed top-0 xl:top-2 left-[50%] translate-x-[-50%] bg-transparent z-100">
            <h2 className="
            px-4 pt-1
            font-logo tracking-wider 
            text-lg sm:text-2xl xl:text-2xl logo-gradient">
                inf<span className="logo-background text-(--main-50)">in</span>ity mk
            </h2>
        </div>
    )
}