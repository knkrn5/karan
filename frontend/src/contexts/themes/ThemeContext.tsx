import { createContext } from "react";

type ThemeContextType = {
  themeMode: "light" | "dark" | "system";
  setThemeMode: (mode: "light" | "dark" | "system") => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);
