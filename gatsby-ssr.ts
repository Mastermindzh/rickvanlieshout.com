import { RenderBodyArgs } from "gatsby";
import React from "react";

const setColorTheme = `
(function() {
  const mode = localStorage.getItem('theme');
  if (mode !== null && ['light', 'dark'].includes(mode)) {
    document.documentElement.dataset.theme = mode;
    return;
  }

  const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof preferredColorScheme.matches === 'boolean';
  if (hasMediaQueryPreference && preferredColorScheme.matches === true) {
    document.documentElement.dataset.theme = 'dark';
  } else {
    document.documentElement.dataset.theme = 'light'
  }
})();
`;
export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme",
      dangerouslySetInnerHTML: {
        __html: setColorTheme,
      },
    }),
  ]);
};