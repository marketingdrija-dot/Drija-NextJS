import type { ContentTranslations } from "@/types/content-i18n";

export type SupportArticleTranslations = {
  question?: string;
  answer?: string;
  tags?: string[];
};

export type SupportArticle = {
  id: string;
  slug: string;
  question: string;
  answer: string;
  tags?: string[];
  translations?: ContentTranslations<SupportArticleTranslations>;
};

export type SupportCategoryTranslations = {
  name?: string;
};

export type SupportCategoryIcon = {
  src: string;
  alt: string;
};

export type SupportCategory = {
  id: string;
  slug: string;
  name: string;
  icon: SupportCategoryIcon;
  order?: number;
  articles: SupportArticle[];
  translations?: ContentTranslations<SupportCategoryTranslations>;
};

export type SupportArticleContext = {
  category: SupportCategory;
  article: SupportArticle;
};
