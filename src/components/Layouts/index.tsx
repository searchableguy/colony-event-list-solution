import type { ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
}

export function CenteredColumn({ children }: Props) {
  return <div className={styles.centeredColumn}>{children}</div>;
}
