import type { ReactNode } from "react";
import styles from "./SupportFaqAccordion.module.css";

type SupportPageHeroProps = {
  title: string;
  children?: ReactNode;
};

export function SupportPageHero({ title, children }: SupportPageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="support-page-title">
      <h1 id="support-page-title" className={styles.title}>
        {title}
      </h1>
      {children}
    </section>
  );
}
