import whereToBuyData from "@/data/where-to-buy.json";
import type { Locale } from "@/lib/i18n/config";

type WhereToBuyData = {
  hero: Record<Locale, { src: string; alt: string }>;
};

const data = whereToBuyData as WhereToBuyData;

export function getWhereToBuyHero(locale: Locale) {
  return data.hero[locale];
}
