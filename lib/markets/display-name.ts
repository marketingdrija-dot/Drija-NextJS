import type { Locale } from "@/lib/i18n/config";
import type { MarketCode } from "@/types/market";

type SelectableMarketCode = Exclude<MarketCode, "ALL">;

const MARKET_NAMES: Record<Locale, Record<SelectableMarketCode, string>> = {
  es: {
    CAR: "Caribe",
    CR: "Costa Rica",
    SV: "El Salvador",
    GT: "Guatemala",
    HN: "Honduras",
    NI: "Nicaragua",
    PA: "Panamá",
    DO: "República Dominicana",
    VE: "Venezuela",
    MX: "México",
  },
  en: {
    CAR: "Caribbean",
    CR: "Costa Rica",
    SV: "El Salvador",
    GT: "Guatemala",
    HN: "Honduras",
    NI: "Nicaragua",
    PA: "Panama",
    DO: "Dominican Republic",
    VE: "Venezuela",
    MX: "Mexico",
  },
};

export function getMarketDisplayName(
  code: MarketCode,
  locale: Locale,
): string {
  if (code === "ALL") return MARKET_NAMES[locale].PA;
  return MARKET_NAMES[locale][code];
}
