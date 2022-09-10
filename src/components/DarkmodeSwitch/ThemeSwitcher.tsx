import React, { useState, useEffect } from "react";

enum themes {
  dark = "dark",
  light = "light",
}

function ThemeSwitcher() {
  const initTheme = document.documentElement.dataset.theme;
  const [theme, setTheme] = useState(initTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme ?? themes.light);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const getOppositeTheme = () => {
    return theme === themes.light ? themes.dark : themes.light;
  };

  function toggleTheme() {
    const newTheme = theme === themes.dark ? themes.light : themes.dark;
    setTheme(newTheme);
  }

  return <a href="#" onClick={toggleTheme}>{`Switch to ${getOppositeTheme()} mode`}</a>;
}

export default ThemeSwitcher;
