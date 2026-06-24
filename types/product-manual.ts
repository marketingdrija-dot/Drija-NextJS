import type { ContentTranslations } from "@/types/content-i18n";

export type ProductManualPdf = {
  src: string;
  filename: string;
};

export type ProductManualItem = {
  id: string;
  slug: string;
  name: string;
  pdf: ProductManualPdf;
};

export type ProductManualGroupTranslations = {
  name?: string;
};

export type ProductManualGroup = {
  id: string;
  slug: string;
  name: string;
  order: number;
  items: ProductManualItem[];
  translations?: ContentTranslations<ProductManualGroupTranslations>;
};

export type ProductManualSectionTranslations = {
  name?: string;
};

export type ProductManualSection = {
  id: string;
  slug: string;
  name: string;
  order: number;
  groups: ProductManualGroup[];
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
