import { Image } from "@/components/Image";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";
import * as styles from "./PostHeader.module.scss";

type Props = { author: { name: string; photo: string } };

export const PostHeader: FunctionComponent<Props> = ({ author }) => {
  return (
    <div className={styles.header}>
      <span>
        <Image alt={author.name} path={author.photo} className={styles.photo} />
        <span className={`${styles.title} hideInPrintView`}>
          <Link className={styles.name} to="/">
            Rick <span className={styles.surname}>van Lieshout</span>
          </Link>
        </span>
        <span className={`${styles.title} showInPrintView`}>
          <Link className={styles.name} to="/">
            rickvanLieshout.com
          </Link>
        </span>
      </span>

      <span className="hideInPrintView">
        <Link to="/" style={{ lineHeight: "50px", marginRight: "10px" }}>
          ↩ All articles
        </Link>
        <ThemeSwitcher showLabel={false} />
      </span>
    </div>
  );
};
