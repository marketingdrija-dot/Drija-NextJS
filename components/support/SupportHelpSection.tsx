import Image from "next/image";
import Link from "next/link";

import styles from "./SupportHelpSection.module.css";

export type SupportHelpItem = {
  label: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
};

type SupportHelpSectionProps = {
  title: string;
  items: SupportHelpItem[];
};

export function SupportHelpSection({ title, items }: SupportHelpSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="support-help-title">
      <div className={styles.inner}>
        <h2 id="support-help-title" className={styles.title}>
          {title}
        </h2>

        <div className={styles.grid}>
          {items.map((item) => (
            <Link key={item.href + item.label} href={item.href} className={styles.card}>
              <span className={styles.iconWrap}>
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  width={52}
                  height={52}
                  className={styles.icon}
                />
              </span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
