import type { ContentTranslations } from "@/types/content-i18n";
import type { MarketCode } from "@/types/market";

export type CategoryTranslations = {
  name?: string;
  description?: string;
  image?: { src: string; alt: string };
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: { src: string; alt: string };
  productCount?: number;
  featured?: boolean;
  order?: number;
  /** Markets where the category is offered. Use "ALL" for every market. */
  availableMarkets?: MarketCode[];
  translations?: ContentTranslations<CategoryTranslations>;
};
