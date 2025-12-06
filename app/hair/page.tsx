"use client";

import { useState } from "react";
import type { HairServicesData } from "@/types";
import { getHairServices } from "@/lib/hair-services";

export default function HairPage() {
    const hairServicesData: HairServicesData = getHairServices();
    const [expandedPanel, setExpandedPanel] = useState<string>("cut-and-style");

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    }

    return (
        <section>
            <div className="bg-white">
            </div>
        </section>
    );
}