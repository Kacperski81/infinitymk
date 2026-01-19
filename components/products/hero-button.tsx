import Link from "next/link";

export default function HeroButton({ label, href } : { label: string, href: string }) {
    return (
        <Link 
            href={href}
            className="group flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-(--main-150) text-(--main-800) rounded-sm text-xs sm:text-sm lg:text-base xl:text-lg font-bold tracking-wide shadow-lg hover:shadow-2xl hover:bg-(--main-150)/90 transition-all duration-300"
            >
            {label}
        </Link>
    )
}