import React, { useState } from "react";

type Theme = "light" | "dark";

type ThemContext = {
  theme: Theme;
  toggleTheme: () => void;
  
};
type Props ={
    children: React.ReactNode;
}
export const ThemeContext = React.createContext<ThemContext>(
    {} as ThemContext
  );
  
export const ThemeProvider = (props: Props) => {

  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
};

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {props.children}
      </ThemeContext.Provider>
    );
};
