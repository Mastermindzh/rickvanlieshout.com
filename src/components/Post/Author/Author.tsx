import { useSiteMetadata } from "@/hooks";
import React from "react";
import * as styles from "./Author.module.scss";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles.author}>
      <p className={styles.bio}>
        Written by:{" "}
        <a href="/pages/about">
          <strong>{author.name}</strong>
        </a>
        <span className="showInPrintView"> {`@ ${window.location}`}</span>
      </p>
    </div>
  );
};

export default Author;
