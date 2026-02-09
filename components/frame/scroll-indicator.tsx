"use client";

import type { ScrollIndicatorProps } from "@/types";

export function ScrollIndicator({ progress }: ScrollIndicatorProps) {
    const safeProgress = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;

    return (
        <div
            className="scroll-indicator-track"
            role="progressbar"
            aria-valuenow={Math.round(safeProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        >
            <div
                className="scroll-indicator-thumb"
                style={{ height: `${safeProgress * 100}%` }}
            />
        </div>
    );
}