import "./src/assets/scss/main.scss";
import "./src/assets/scss/prism/github.scss";
import "./src/assets/scss/prism/prism-tomorrow.scss";

export const onRouteUpdate = ({ location }: { location: { pathname: string } }) => {
  const elements = document.querySelectorAll("[data-url]");
  const currentUrl = `https://www.rickvanlieshout.com${location.pathname ?? ""}`;

  const setAttributeIfAvailable = (element: Element, elementIdentifier: string) => {
    if (element.hasAttribute(elementIdentifier)) {
      element.setAttribute(elementIdentifier, currentUrl);
    }
  };

  elements.forEach((element) => {
    setAttributeIfAvailable(element, "href");
    setAttributeIfAvailable(element, "content");
  });
};
