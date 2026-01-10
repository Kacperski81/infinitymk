// components/BackButton.tsx
'use client';
import { useRouter } from 'next/navigation';
import BackArrow from "@/components/svgs/back-arrow";

export default function BackButton() {
    const router = useRouter();
    
    return (
        <button 
            className="focus:outline-none flex items-center gap-3 group border-none text-(--main-200) transition-colors hover:text-(--main-50) transition transform hover:scale-105 duration-300"
            aria-label="Back to the collections page"
            onClick={() => router.back()}
        >
            <span className="w-8 h-8 transition-transform group-hover:-translate-x-1">
                <BackArrow />
            </span>
            <span className="tracking-wide text-sm">
                Back to Collections
            </span>
        </button>
    );
}