export type ProductImage = {
  src: string;
  alt: string;
};

import type { ContentTranslations } from "@/types/content-i18n";
import type { MarketCode } from "@/types/market";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductFeatureBlock = {
  id: string;
  title: string;
  description: string;
  image: ProductImage;
};

export type ProductTranslations = {
  name?: string;
  shortDescription?: string;
  description?: string;
  images?: ProductImage[];
  specs?: ProductSpec[];
  features?: ProductFeatureBlock[];
  /** HTML opcional para tabla de especificaciones */
  specsHtml?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  /** Subcategoría dentro de la categoría (ej. french-door, side-by-side) */
  subcategorySlug?: string;
  sku: string;
  isNew?: boolean;
  featured?: boolean;
  images: ProductImage[];
  specs?: ProductSpec[];
  /** Bloques alternados imagen + texto debajo del card principal */
  features?: ProductFeatureBlock[];
  /** HTML opcional para tabla de especificaciones (tiene prioridad sobre specs[]) */
  specsHtml?: string;
  /** Slugs de productos relacionados; si no hay, se infieren de la categoría */
  relatedSlugs?: string[];
  /**
   * Markets where the product is sold. One product document — no duplicates.
   * Use "ALL" for global availability.
   */
  availableMarkets?: MarketCode[];
  /** @deprecated Use availableMarkets. Kept for JSON migration only. */
  countries?: string[];
  translations?: ContentTranslations<ProductTranslations>;
};
