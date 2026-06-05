import { ALL_MARKETS_CODE } from "@/lib/markets/constants";
import type { MarketCode } from "@/types/market";

type SanityMarketRef = {
  code?: string;
  _ref?: string;
};

/**
 * Maps Sanity `availableMarkets` references (or denormalized codes from GROQ)
 * into the same `MarketCode[]` shape used by JSON data and client filters.
 *
 * @example GROQ projection
 * "availableMarkets": availableMarkets[]->code
 */
export function mapSanityAvailableMarkets(
  refs: SanityMarketRef[] | string[] | null | undefined,
): MarketCode[] {
  if (!refs?.length) return [ALL_MARKETS_CODE];

  const codes = refs
    .map((entry) => (typeof entry === "string" ? entry : entry.code))
    .filter((code): code is MarketCode => Boolean(code));

  return codes.length ? codes : [ALL_MARKETS_CODE];
}
