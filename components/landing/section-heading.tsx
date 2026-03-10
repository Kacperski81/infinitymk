"use client";

interface SectionHeadingProps {
  /** The heading text */
  title: string;
  /** Optional subtitle/description text */
  subtitle?: string;
  /** Use gradient style (matches hero), simple style, or page style (subpage headings) */
  variant?: "gradient" | "simple" | "page";
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Custom margin top class */
  marginTop?: string;
  /** Custom opacity for scroll effects */
  style?: React.CSSProperties;
}

/**
 * Unified section/page heading component for consistent typography.
 *
 * Three variants:
 * - "gradient": Decorative gradient text style (used in Hero, About sections)
 * - "simple": Clean uppercase tracking style (used in Services, Testimonials)
 * - "page": Compact uppercase heading for subpages (Hair, Nail, Gallery, etc.)
 */
export default function SectionHeading({
  title,
  subtitle,
  variant = "gradient",
  align = "left",
  marginTop,
  style,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  if (variant === "page") {
    return (
      <h2
        className={`
          ${marginTop || "mt-10 xl:mt-14"}
          font-[family-name:var(--font-aboreto)]
          self-center
          pt-4
          pb-2
          px-10
          text-2xl
          font-semibold
          text-[--main-10]
          text-center
          uppercase
          tracking-widest
        `}
        style={style}
      >
        {title}
      </h2>
    );
  }

  if (variant === "simple") {
    return (
      <div className={`flex flex-col gap-2 ${alignmentClasses[align]}`} style={style}>
        <h2
          className={`
            ${marginTop || "mt-10 xl:mt-14"}
            font-[family-name:var(--font-aboreto)]
            pt-4
            pb-2
            px-10
            text-2xl
            font-semibold
            text-[--main-10]
            uppercase
            tracking-widest
          `}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="leading-relaxed text-sm sm:text-base md:text-lg text-[--main-200] px-4">
            {subtitle}
          </p>
        )}
      </div>
    );
  }

  // Gradient variant
  return (
    <div className={`flex flex-col gap-6 ${alignmentClasses[align]}`} style={style}>
      <span
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold hero-background-gradient"
        style={{ fontFamily: "var(--font-aboreto)" }}
      >
        {title}
      </span>
      <div
        className={`w-16 h-px ${align === "center" ? "mx-auto" : ""}`}
        style={{ background: "var(--main-200)" }}
      />
      {subtitle && (
        <p
          className="xl:max-w-xl text-lg md:text-xl leading-relaxed font-light"
          style={{ fontFamily: "var(--font-lato)", color: "var(--main-100)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
