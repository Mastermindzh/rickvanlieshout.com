import React from "react";
import { useSiteMetadata } from "../../../hooks";
import { PostHeader } from "../../PostHeader/PostHeader";
import * as styles from "./Content.module.scss";

interface Props {
  title: string;
  body: string;
  subTitle?: string;
}

const Content: React.FC<Props> = ({ body, title, subTitle }: Props) => {
  const { author } = useSiteMetadata();
  return (
    <>
      <PostHeader author={author} />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subTitle}>- {subTitle}</h2>
        <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
};

export default Content;
