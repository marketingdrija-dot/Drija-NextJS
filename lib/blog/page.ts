import type { Locale } from "@/lib/i18n/config";

const BLOG_HERO: Record<Locale, { src: string; alt: string }> = {
  es: {
    src: "/images/blog/pizza-casera.jpg",
    alt: "Cocina moderna DRIJA",
  },
  en: {
    src: "/images/blog/pizza-casera.jpg",
    alt: "Modern DRIJA kitchen",
  },
};

export function getBlogHero(locale: Locale) {
  return BLOG_HERO[locale];
}
