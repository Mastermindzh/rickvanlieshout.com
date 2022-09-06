import { Link } from "gatsby";
import React from "react";
import CookieConsent from "react-cookie-consent";
import * as styles from "./CookieBar.module.scss";

export const CookieBar = () => {
  return (
    <CookieConsent
      disableButtonStyles
      disableStyles
      contentClasses={styles.content}
      containerClasses={styles.cookieBar}
      buttonClasses={styles.button}
    >
      This website uses cookies to enhance the user experience.{" "}
      <small>Click <Link to="/">here</Link> to learn more about cookies.</small>
    </CookieConsent>
  );
};
