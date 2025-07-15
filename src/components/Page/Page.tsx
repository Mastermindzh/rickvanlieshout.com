import React, { useEffect, useRef } from "react";

import { Helmet } from "react-helmet";
import * as styles from "./Page.module.scss";
import type { Nullable } from "@/types";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ title, children }: Props) => {
  const pageRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
      </Helmet>
      <div ref={pageRef} className={styles.page}>
        <div className={styles.inner}>
          {title && <h1 className={styles.title}>{title}</h1>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Page;
