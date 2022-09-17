/* eslint-disable no-undef */
import React, { FunctionComponent, useEffect, useState } from "react";
import Toggle from "react-toggle";
import { Moon } from "./components/Moon";
import { Sun } from "./components/Sun";
import "./theme.scss";
import { Themes } from "./Themes";

type Props = { showLabel: boolean };

export const ThemeSwitcher: FunctionComponent<Props> = ({ showLabel }) => {
  if (typeof document === "undefined") {
    return null;
  }
  const initTheme = document.documentElement.dataset.theme;
  const [theme, setTheme] = useState(initTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme ?? Themes.light);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === Themes.dark ? Themes.light : Themes.dark;
    setTheme(newTheme);
  }

  return (
    <span className="hideInPrintView">
      {showLabel && "Switch color mode:"}
      {showLabel && <br />}
      <Toggle
        checked={theme === Themes.dark}
        icons={{
          checked: <Moon />,
          unchecked: <Sun />,
        }}
        onChange={toggleTheme}
      />
    </span>
  );
};
