import type { MarketCode } from "@/types/market";

type SelectableMarketCode = Exclude<MarketCode, "ALL">;

export const MARKET_FLAG_SRC: Record<SelectableMarketCode, string> = {
  CAR: "/images/regions/CAR-Flag-icon.jpg",
  CR: "/images/regions/CR-Flag-icon.jpg",
  SV: "/images/regions/Salvador-Flag-icon.jpg",
  GT: "/images/regions/Guatemala-Flag-icon.jpg",
  HN: "/images/regions/Honduras-Flag-icon.jpg",
  NI: "/images/regions/Nicaragua-Flag-icon.jpg",
  PA: "/images/regions/Panama-Flag-icon.jpg",
  DO: "/images/regions/RD-Flag-icon.jpg",
  VE: "/images/regions/Venezuela-Flag-icon.jpg",
  MX: "/images/regions/Mexico-Flag-icon.jpg",
};

export function getMarketFlagSrc(code: MarketCode): string {
  if (code === "ALL") return MARKET_FLAG_SRC.PA;
  return MARKET_FLAG_SRC[code];
}
