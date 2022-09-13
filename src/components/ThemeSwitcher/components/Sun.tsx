import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Sun = () => {
  return (
    <div
      style={{
        color: "#f39c12",
        position: "absolute",
        fontSize: "1em",
        top: "-3px",
        left: "-3px",
      }}
    >
      <FontAwesomeIcon icon={faSun} />
    </div>
  );
};
