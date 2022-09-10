import { Image } from "@/components/Image";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import * as styles from "./PostHeader.module.scss";

type Props = { author: { name: string; photo: string } };

export const PostHeader: FunctionComponent<Props> = ({ author }) => {
  return (
    <div className={styles.header}>
      <span>
        <Image alt={author.name} path={author.photo} className={styles.photo} />
        <span className={styles.title}>
          <Link className={styles.name} to="/">
            Rick <span className={styles.surname}>van Lieshout</span>
          </Link>
        </span>
      </span>

      <span>
        <Link to="/" style={{ lineHeight: "50px", marginRight: "10px" }}>
          ↩ All articles
        </Link>
      </span>
    </div>
  );
};
