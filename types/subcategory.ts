import type { ContentTranslations } from "@/types/content-i18n";

export type SubcategoryTranslations = {
  name?: string;
  icon?: { src: string; alt: string };
};

export type Subcategory = {
  id: string;
  slug: string;
  name: string;
  icon: { src: string; alt: string };
  order?: number;
  translations?: ContentTranslations<SubcategoryTranslations>;
};
