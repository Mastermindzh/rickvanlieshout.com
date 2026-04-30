import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import type { Nullable } from "@/types";

import * as styles from "./Page.module.scss";

interface Props {
  title?: string;
  children: React.ReactNode;
  bodyClassName?: string;
}

const Page: React.FC<Props> = ({ title, children, bodyClassName }: Props) => {
  const pageRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  const bodyClasses = [styles.body, bodyClassName].filter(Boolean).join(" ");

  return (
    <>
      <Helmet>
        <meta property="og:type" content="website" />
      </Helmet>
      <div ref={pageRef} className={styles.page}>
        <div className={styles.inner}>
          {title && <h1 className={styles.title}>{title}</h1>}
          <div className={bodyClasses || undefined}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Page;
