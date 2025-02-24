import { createContext, useContext } from "react";

type ThemeContextType = {
  themeMode: string;
  setThemeMode: (mode: string) => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
