import Link from "next/link";
import { ProductImageSlider } from "@/components/products/ProductImageSlider";
import { ProductSpecsTable } from "@/components/products/ProductSpecsTable";
import type { Product } from "@/types/product";

import styles from "./ProductMainCard.module.css";

type ProductMainCardProps = {
  product: Product;
  buyHref: string;
  buyLabel: string;
  specsTitle: string;
  prevImageLabel: string;
  nextImageLabel: string;
};

export function ProductMainCard({
  product,
  buyHref,
  buyLabel,
  specsTitle,
  prevImageLabel,
  nextImageLabel,
}: ProductMainCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.grid}>
        <ProductImageSlider
          images={product.images}
          prevLabel={prevImageLabel}
          nextLabel={nextImageLabel}
        />

        <div className={styles.info}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          <ProductSpecsTable
            title={specsTitle}
            specs={product.specs}
            specsHtml={product.specsHtml}
          />

          <div className={styles.actions}>
            <Link href={buyHref} className={styles.buy}>
              {buyLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
