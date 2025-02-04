// src/contexts/ThemeProvider.tsx
import React, { useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setActiveTheme] = useState("system");

  const setThemeMode = (mode: string) => {
    setActiveTheme(mode);
  };

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
