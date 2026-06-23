import { OptimizedImage } from "@/components/ui/OptimizedImage";

import styles from "./ManualsHero.module.css";

type ManualsHeroProps = {
  title: string;
  image: { src: string; alt: string };
};

export function ManualsHero({ title, image }: ManualsHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroMedia}>
        <OptimizedImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.overlay} aria-hidden />
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </section>
  );
}
