import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/config";
import { getBlogHero } from "@/lib/blog/page";

import styles from "./BlogPageContent.module.css";

type BlogHeroProps = {
  locale: Locale;
};

export function BlogHero({ locale }: BlogHeroProps) {
  const hero = getBlogHero(locale);

  return (
    <div className={styles.hero}>
      <OptimizedImage
        src={hero.src}
        alt={hero.alt}
        fill
        priority
        sizes="100vw"
        className={styles.heroImage}
      />
    </div>
  );
}
