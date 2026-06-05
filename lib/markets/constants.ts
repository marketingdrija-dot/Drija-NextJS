import type { MarketCode } from "@/types/market";

/** Sentinel value: entity is visible in every market */
export const ALL_MARKETS_CODE: MarketCode = "ALL";

export const DEFAULT_MARKET_CODE: MarketCode = "PA";

export const MARKET_STORAGE_KEY = "drija-selected-market";

export const MARKET_CODES: MarketCode[] = [
  "CAR",
  "CR",
  "SV",
  "GT",
  "HN",
  "NI",
  "PA",
  "DO",
  "VE",
  "MX",
];
