import categoriesData from "@/data/categories.json";
import type { Locale } from "@/lib/i18n/config";
import { localizeCategory } from "@/lib/i18n/localize-content";
import type { Category } from "@/types/category";

export type FooterCategoryLink = {
  name: string;
  href: string;
};

const FOOTER_LEFT_SLUGS = [
  "extractores",
  "fregaderos",
  "lavadoras",
  "pequenos-electrodomesticos",
  "refrigeradores",
  "estufas",
] as const;

const FOOTER_RIGHT_SLUGS = [
  "fabricador-de-hielo",
  "hornos",
  "microondas",
  "vineras",
  "dispensadores-de-agua",
  "calentadores-de-agua",
  "centros-de-bebidas",
] as const;

function mapSlugsToLinks(
  slugs: readonly string[],
  categoryMap: Map<string, Category>,
  locale: Locale,
  href: (path: string) => string,
): FooterCategoryLink[] {
  return slugs.flatMap((slug) => {
    const category = categoryMap.get(slug);
    if (!category) return [];

    const localized = localizeCategory(category, locale);
    return [
      {
        name: localized.name,
        href: href(`/categories/${slug}`),
      },
    ];
  });
}

export function buildFooterCategories(
  locale: Locale,
  href: (path: string) => string,
): { left: FooterCategoryLink[]; right: FooterCategoryLink[] } {
  const categoryMap = new Map(
    (categoriesData as Category[]).map((category) => [category.slug, category]),
  );

  return {
    left: mapSlugsToLinks(FOOTER_LEFT_SLUGS, categoryMap, locale, href),
    right: mapSlugsToLinks(FOOTER_RIGHT_SLUGS, categoryMap, locale, href),
  };
}
