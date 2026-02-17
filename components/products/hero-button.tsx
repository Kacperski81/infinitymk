import Link from "next/link";

export default function HeroButton({ label, href } : { label: string, href: string }) {
    return (
        <Link 
            href={href}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--main-100)] text-[var(--main-800)] rounded-[var(--radius)] text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:bg-[var(--main-200)] transition-all duration-200 border border-[var(--main-300)]"
            >
            {label}
        </Link>
    )
}