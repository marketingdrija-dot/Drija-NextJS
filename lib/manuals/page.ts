import productManualsData from "@/data/product-manuals.json";
import type { Locale } from "@/lib/i18n/config";
import type {
  ProductManualSection,
  ProductManualsHeroImage,
  ProductManualsPageConfig,
} from "@/types/product-manual";

const config = productManualsData as ProductManualsPageConfig;

export function getProductManualsHero(locale: Locale): ProductManualsHeroImage {
  return config.hero[locale];
}

export function getProductManualSections(locale: Locale): ProductManualSection[] {
  return config.sections
    .map((section) => localizeManualSection(section, locale))
    .sort((a, b) => a.order - b.order);
}

function localizeManualSection(
  section: ProductManualSection,
  locale: Locale,
): ProductManualSection {
  if (locale === "es" || !section.translations?.en) {
    return section;
  }

  const { translations, ...base } = section;

  return {
    ...base,
    name: translations.en.name ?? section.name,
  };
}
