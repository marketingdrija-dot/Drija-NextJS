"use client";

import { useMemo } from "react";
import { getVisibleCatalog } from "@/lib/markets/filter";
import {
  buildProductSearchIndex,
  createProductSearchIndex,
  searchProducts,
  type ProductSearchHit,
} from "@/lib/search/product-search";
import { selectMarketCode, useMarketStore } from "@/stores/market-store";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export function useProductSearch(
  products: Product[],
  categories: Category[],
  href: (path: string) => string,
  query: string,
) {
  const marketCode = useMarketStore(selectMarketCode);
  const hasHydrated = useMarketStore((state) => state.hasHydrated);

  const searchItems = useMemo(() => {
    if (!hasHydrated) return [];

    const visibleProducts = getVisibleCatalog(
      categories,
      products,
      marketCode,
    ).products;

    return buildProductSearchIndex(visibleProducts, categories, href);
  }, [categories, hasHydrated, href, marketCode, products]);

  const fuse = useMemo(
    () => createProductSearchIndex(searchItems),
    [searchItems],
  );

  const results = useMemo(
    () => searchProducts(fuse, query),
    [fuse, query],
  );

  return {
    results,
    hasHydrated,
    resultCount: results.length,
  };
}

export type { ProductSearchHit };
