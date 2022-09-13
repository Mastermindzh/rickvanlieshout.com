import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Moon = () => {
  return (
    <div
      style={{
        fontSize: "1.1em",
        position: "absolute",
        top: "-4px",
        color: "#f1c40f",
      }}
    >
      <FontAwesomeIcon icon={faMoon} />
    </div>
  );
};
