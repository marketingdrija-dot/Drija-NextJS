import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { cn } from "@/lib/utils";
import type { ProductFeatureBlock } from "@/types/product";

import styles from "./ProductFeatureBlocks.module.css";

type ProductFeatureBlocksProps = {
  features: ProductFeatureBlock[];
};

export function ProductFeatureBlocks({ features }: ProductFeatureBlocksProps) {
  if (!features.length) return null;

  return (
    <section className={styles.section} aria-label="Características del producto">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:space-y-20 lg:px-8">
        {features.map((feature, index) => {
          const reversed = index % 2 === 1;

          return (
            <article
              key={feature.id}
              className={cn(styles.block, reversed && styles.blockReversed)}
            >
              <div className={styles.media}>
                <OptimizedImage
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              <div className={styles.content}>
                <h2 className={styles.title}>{feature.title}</h2>
                <p className={styles.description}>{feature.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
