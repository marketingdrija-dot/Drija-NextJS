import type { Locale } from "@/lib/i18n/config";
import type { ContentTranslations } from "@/types/content-i18n";
import type { Subcategory } from "@/types/subcategory";

type WithTranslations<T> = T & {
  translations?: ContentTranslations<T>;
};

export function localizeSubcategory(
  subcategory: WithTranslations<Subcategory>,
  locale: Locale,
): Subcategory {
  if (locale === "es" || !subcategory.translations?.en) {
    const { translations: _, ...base } = subcategory;
    return base;
  }

  const en = subcategory.translations.en;
  return {
    id: subcategory.id,
    slug: subcategory.slug,
    name: en.name ?? subcategory.name,
    icon: en.icon ?? subcategory.icon,
    order: subcategory.order,
  };
}
