import { useSiteMetadata } from "@/hooks";
import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

import { Author } from "./Author";
import { Contacts } from "./Contacts";
import { Copyright } from "./Copyright";
import { Menu } from "./Menu";
import * as styles from "./Sidebar.module.scss";

type Props = {
  isIndex?: boolean;
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu, legalMenu } = useSiteMetadata();

  return (
    <div className={styles.sidebar}>
      <div className={styles.inner}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
        <Menu menu={legalMenu} />
        <ThemeSwitcher showLabel />
      </div>
    </div>
  );
};

export default Sidebar;
