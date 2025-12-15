"use client";

import { useState } from "react";
import type { HairServicesData } from "@/types";
import { getHairServices } from "@/lib/hair-services";
import HairServices from "@/components/hair/hair-services";
import Footer from "@/components/footer";
import HairTreatment from "@/components/hair/hair-treatments";

export default function HairPage() {
    const hairServicesData: HairServicesData = getHairServices();
    const [expandedPanel, setExpandedPanel] = useState<string>("cut-and-style");

    const togglePanel = (panelId: string) => {
        setExpandedPanel(panelId);
    }

    return (
        <section>
            <div className="flex flex-col">
                <HairServices />
                <HairTreatment />
                <Footer />
            </div>
        </section>
    );
}