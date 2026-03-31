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
            data-theme-value={key}
            aria-pressed={theme === key}
            aria-label={`${label} theme`}
            className="theme-toggle-btn px-2 py-0.5 text-sm tracking-wide transition-all duration-200 cursor-pointer"
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
