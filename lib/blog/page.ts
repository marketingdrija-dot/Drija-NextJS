import blogPageData from "@/data/blog-page.json";
import type { Locale } from "@/lib/i18n/config";

type BlogPageHeroImage = {
  src: string;
  alt: string;
};

type BlogPageConfig = {
  hero: Record<Locale, BlogPageHeroImage>;
};

const config = blogPageData as BlogPageConfig;

export function getBlogHero(locale: Locale): BlogPageHeroImage {
  return config.hero[locale];
}
