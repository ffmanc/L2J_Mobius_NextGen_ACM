"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to 'dark' as the initial state to match the blocking script's default.
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // On mount, read the saved theme from localStorage
    const saved = localStorage.getItem("l2j_theme") as Theme | null;
    if (saved) {
      setThemeState(saved);
    }
    // If nothing is saved, keep dark (the default)
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      let resolved: "dark" | "light";

      if (theme === "system") {
        resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } else {
        resolved = theme;
      }

      // Add transition class, apply new theme, remove transition class after animation
      root.classList.add("theme-switching");

      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      root.style.colorScheme = resolved;
      setResolvedTheme(resolved);
      localStorage.setItem("l2j_theme", theme);

      // Remove the transition class after the transition completes
      const timer = setTimeout(() => {
        root.classList.remove("theme-switching");
      }, 400);
      return () => clearTimeout(timer);
    };

    applyTheme();

    // Watch for system theme changes if in system mode
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", applyTheme);
      return () => mq.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
