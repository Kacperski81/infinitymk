"use client";

import type { OverlayTransitionProps } from "@/types";

/**
 * This wrapper creates the "slide over hero" effect.
 * It sits at z-20 with a solid background so as the virtual scroll
 * moves everything up, this section naturally covers the hero beneath.
 * No clip-path needed — the z-index stacking + bg color handles the cover.
 */
export default function OverlayTransition({ children }: OverlayTransitionProps) {
    return (
        <div className="relative z-20 bg-background">
            {children}
        </div>
    );
}
