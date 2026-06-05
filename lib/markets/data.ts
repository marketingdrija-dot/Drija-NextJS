import marketsData from "@/data/markets.json";
import { DEFAULT_MARKET_CODE } from "@/lib/markets/constants";
import type { Market, MarketCode } from "@/types/market";

const markets = marketsData as Market[];

export function getMarkets(): Market[] {
  return [...markets].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getDefaultMarketCode(): MarketCode {
  return (
    markets.find((market) => market.isDefault)?.code ?? DEFAULT_MARKET_CODE
  );
}

export function getMarketByCode(code: MarketCode): Market | undefined {
  return markets.find((market) => market.code === code);
}

export function isValidMarketCode(code: string): code is MarketCode {
  return markets.some((market) => market.code === code);
}
