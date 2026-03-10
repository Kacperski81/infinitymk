"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "amber" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "amber",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

// Amber is always the default for first-time visitors.
// We only restore a previously saved manual override from localStorage.
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "amber";
  try {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "dark") return stored;
  } catch {
    // localStorage unavailable (private browsing, etc.)
  }
  return "amber";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark");
  if (theme === "dark") root.classList.add(theme);
  // "amber" = no class, :root CSS variables are the amber defaults
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("amber");

  useEffect(() => {
    const initial = getInitialTheme();
    setThemeState(initial);
    applyTheme(initial);
  }, []);

  function setTheme(next: Theme) {
    setThemeState(next);
    applyTheme(next);
    try {
      if (next === "amber") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", next);
      }
    } catch {
      // ignore
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
