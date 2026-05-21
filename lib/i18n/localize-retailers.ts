import type { Locale } from "@/lib/i18n/config";
import type { CountryRetailers } from "@/types/retailer";

export function localizeCountryRetailers(
  groups: CountryRetailers[],
  locale: Locale,
): CountryRetailers[] {
  return groups.map((group) => {
    if (locale === "es" || !group.translations?.en) {
      const { translations: _, ...base } = group;
      return base;
    }

    return {
      ...group,
      country: group.translations.en.country ?? group.country,
    };
  });
}
