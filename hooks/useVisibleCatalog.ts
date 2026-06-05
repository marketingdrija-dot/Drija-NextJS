"use client";

import { useMemo } from "react";
import { getVisibleCatalog } from "@/lib/markets/filter";
import { selectMarketCode, useMarketStore } from "@/stores/market-store";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export function useVisibleCatalog(
  categories: Category[],
  products: Product[],
) {
  const marketCode = useMarketStore(selectMarketCode);
  const hasHydrated = useMarketStore((state) => state.hasHydrated);

  const catalog = useMemo(
    () => getVisibleCatalog(categories, products, marketCode),
    [categories, products, marketCode],
  );

  return {
    ...catalog,
    marketCode,
    hasHydrated,
  };
}
