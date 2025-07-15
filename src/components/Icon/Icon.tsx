import React from "react";

import * as styles from "./Icon.module.scss";
import { ICONS } from "@/constants";

interface Props {
  name: keyof typeof ICONS;
  icon: {
    viewBox?: string;
    path?: string;
  };
}

const Icon: React.FC<Props> = ({ name, icon }: Props) => (
  <svg className={styles.icon} viewBox={icon.viewBox}>
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

export default Icon;
