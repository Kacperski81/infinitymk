import Link from "next/link";

interface ServiceButtonProps {
  href: string;
  label: string;
  serviceName: string;
  visible: boolean;
}

export default function ServiceButton({ href, label, serviceName, visible }: ServiceButtonProps) {
  return (
    <Link
      href={href}
      aria-label={`View all ${serviceName} services`}
      className={`
        inline-flex items-center gap-2
        border border-(--main-100)/60
        text-(--main-100)
        px-5 py-2
        rounded-full
        uppercase
        text-xs
        font-(family-name:--font-aboreto)
        tracking-widest
        transition-all duration-300
        hover:bg-(--main-100)/15
        hover:border-(--main-100)
        hover:tracking-[0.2em]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-(--main-100)/60
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
        ${visible
          ? "opacity-100 translate-y-0 transition-all duration-500 delay-700"
          : "opacity-0 translate-y-2 pointer-events-none transition-all duration-300"
        }
      `}
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}
