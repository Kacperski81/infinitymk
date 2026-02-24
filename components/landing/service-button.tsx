import Link from "next/link";

interface ServiceButtonProps {
  href: string;
  label: string;
  serviceName: string;
  visible: boolean;
}

export default function ServiceButton({
  href,
  label,
  serviceName,
  visible,
}: ServiceButtonProps) {
  return (
    <Link
      href={href}
      aria-label={`View all ${serviceName} services`}
      className={[
        // Layout
        "inline-flex items-center justify-center gap-2",
        // Min touch target (44 px) on mobile, tighter on desktop
        "min-h-[44px] md:min-h-[36px]",
        // Responsive horizontal padding
        "px-6 sm:px-5",
        // Shape
        "rounded-full",
        // Border
        "border border-(--main-200)/70",
        // Typography
        "font-(family-name:--font-aboreto)",
        "text-[clamp(0.65rem,1.5vw,0.75rem)]",
        "uppercase tracking-[0.18em]",
        "whitespace-nowrap",
        // Colors
        "text-(--main-100)",
        "bg-transparent",
        // Transition
        "transition-all duration-300 ease-out",
        // Hover
        "hover:bg-(--main-100)/10",
        "hover:border-(--main-100)",
        "hover:tracking-[0.24em]",
        "hover:text-(--main-50)",
        // Focus-visible (keyboard)
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-(--main-100)/70",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-transparent",
        // Visibility animation driven by open panel state
        visible
          ? "opacity-100 translate-y-0 duration-500 delay-700 pointer-events-auto"
          : "opacity-0 translate-y-2 duration-300 delay-0 pointer-events-none",
      ].join(" ")}
    >
      <span>{label}</span>
      {/* Directional arrow — decorative, hidden from assistive tech */}
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
        focusable="false"
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Link>
  );
}
