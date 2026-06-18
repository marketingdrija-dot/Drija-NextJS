"use client";

import { useI18n } from "@/lib/i18n/context";

import styles from "./MarketBar.module.css";

export function MarketBar() {
  const { dict } = useI18n();

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <p className={styles.disclaimer}>{dict.market.disclaimer}</p>
      </div>
    </div>
  );
}
