import { ALL_MARKETS_CODE } from "@/lib/markets/constants";
import type { Category } from "@/types/category";
import type { MarketCode } from "@/types/market";
import type { Product } from "@/types/product";

/**
 * Resolves `availableMarkets` from current JSON or legacy `countries` field.
 * Empty / missing values default to ALL for backward compatibility.
 */
export function getProductAvailableMarkets(product: Product): MarketCode[] {
  if (product.availableMarkets?.length) {
    return product.availableMarkets;
  }

  if (product.countries?.length) {
    return product.countries as MarketCode[];
  }

  return [ALL_MARKETS_CODE];
}

export function getCategoryAvailableMarkets(category: Category): MarketCode[] {
  if (category.availableMarkets?.length) {
    return category.availableMarkets;
  }

  return [ALL_MARKETS_CODE];
}
