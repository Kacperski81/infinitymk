"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "amber" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "amber",
  setTheme: () => {},
  mounted: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

// Manual choice in localStorage always wins.
// Otherwise respect the OS dark-mode preference.
// Amber is the fallback when neither is set.
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "amber";
  // Read from the data-attribute set by the inline <head> script first
  const fromAttr = document.documentElement.dataset.theme as Theme | undefined;
  if (fromAttr === "amber" || fromAttr === "dark") return fromAttr;
  try {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "amber" || stored === "dark") return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "amber";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark");
  if (theme === "dark") root.classList.add(theme);
  root.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
