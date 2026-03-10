"use client";

import type { OverlayTransitionProps } from "@/types";

export default function OverlayTransition({ children }: OverlayTransitionProps) {
    return (
        <div className="relative z-20 bg-background">
            <div
                className="fixed top-0 left-0 right-0 z-25 pointer-events-none h-16 lg:h-20"
            />
            {children}
        </div>
    );
}
