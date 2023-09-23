import React from "react";
import Helmet from "react-helmet";

import { CookieBar } from "../Cookiebar/CookieBar";
import * as styles from "./Layout.module.scss";
import { useSiteMetadata } from "@/hooks";

interface Props {
  title: string;
  description?: string;
  socialImage?: string;
  children: React.ReactNode;
  noIndex?: boolean;
  slug?: string;
}

const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  socialImage = "",
  noIndex = false,
  slug,
}: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage || author.photo;
  const metaImageUrl = url + metaImage;

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImageUrl} />
        {slug && <meta property="og:url" content={`${url}${slug}`} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImageUrl} />
        <meta property="twitter:site" content="@mastermindzh" />
        {noIndex && <meta name="robots" content="noindex" />}
      </Helmet>
      {children}
      <CookieBar />
    </div>
  );
};

export default Layout;
