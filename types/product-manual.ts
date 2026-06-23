import type { ContentTranslations } from "@/types/content-i18n";

export type ProductManualPdf = {
  src: string;
  filename: string;
};

export type ProductManualFilter = {
  id: string;
  label: string;
};

export type ProductManualFilterTranslations = {
  label?: string;
};

export type ProductManualItem = {
  id: string;
  slug: string;
  name: string;
  filterId: string;
  pdf: ProductManualPdf;
};

export type ProductManualSectionTranslations = {
  name?: string;
  filters?: ContentTranslations<ProductManualFilterTranslations>[];
};

export type ProductManualSection = {
  id: string;
  slug: string;
  name: string;
  order: number;
  filters: ProductManualFilter[];
  items: ProductManualItem[];
  translations?: ContentTranslations<ProductManualSectionTranslations>;
};

export type ProductManualsHeroImage = {
  src: string;
  alt: string;
};

export type ProductManualsPageConfig = {
  hero: Record<"es" | "en", ProductManualsHeroImage>;
  sections: ProductManualSection[];
};
