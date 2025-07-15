import React from "react";
import * as styles from "./Author.module.scss";
import { useSiteMetadata } from "@/hooks";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles.author}>
      <p className={styles.bio}>
        Written by:{" "}
        <a href="/pages/about/">
          <strong>{author.name}</strong>
        </a>
        {typeof window !== "undefined" ? (
          // eslint-disable-next-line no-undef
          <span className="showInPrintView"> {window ? `@ ${window.location}` : ""}</span>
        ) : (
          ""
        )}
      </p>
    </div>
  );
};

export default Author;
