// src/contexts/ThemeProvider.tsx
import React, { useMemo, useState } from "react";
import { ThemeContext } from "./themes/ThemeContext";

type ThemeContextType = {
  themeMode: "light" | "dark" | "system";
  setThemeMode: (mode: "light" | "dark" | "system") => void;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] =
    useState<ThemeContextType["themeMode"]>("system");

  // Memoize the context value
  const contextValue = useMemo(
    () => ({ themeMode, setThemeMode }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
