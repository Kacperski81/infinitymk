"use client";

import { useTheme, type Theme } from "./theme-provider";

const THEMES: { key: Theme; label: string }[] = [
  { key: "amber", label: "Amber" },
  { key: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className="flex items-center gap-1"
    >
      {THEMES.map(({ key, label }, i) => (
        <span key={key} className="flex items-center">
          <button
            onClick={() => setTheme(key)}
            aria-pressed={theme === key}
            aria-label={`${label} theme`}
            className={`
              px-2 py-0.5 text-sm tracking-wide transition-all duration-200 cursor-pointer
              ${
                theme === key
                  ? "text-(--main-10) font-semibold underline underline-offset-4 decoration-(--main-200)"
                  : "text-(--main-200) hover:text-(--main-100)"
              }
            `}
          >
            {label}
          </button>
          {i < THEMES.length - 1 && (
            <span className="text-(--main-400) select-none text-xs">·</span>
          )}
        </span>
      ))}
    </div>
  );
}
