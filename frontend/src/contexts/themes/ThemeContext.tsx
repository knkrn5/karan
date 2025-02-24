import { createContext } from "react";

type ThemeContextType = {
  themeMode: "light" | "dark" | "system";
  setThemeMode: (mode: "light" | "dark" | "system") => void;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);

/* export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}; */
