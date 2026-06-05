import {
  getCategoryAvailableMarkets,
  getProductAvailableMarkets,
} from "@/lib/markets/normalize";
import { ALL_MARKETS_CODE } from "@/lib/markets/constants";
import type { Category } from "@/types/category";
import type { MarketCode } from "@/types/market";
import type { Product } from "@/types/product";

export function isAvailableInMarket(
  availableMarkets: MarketCode[] | undefined,
  selectedMarket: MarketCode,
): boolean {
  if (!availableMarkets?.length) return true;
  if (availableMarkets.includes(ALL_MARKETS_CODE)) return true;
  return availableMarkets.includes(selectedMarket);
}

export function filterProductsByMarket(
  products: Product[],
  selectedMarket: MarketCode,
): Product[] {
  return products.filter((product) =>
    isAvailableInMarket(
      getProductAvailableMarkets(product),
      selectedMarket,
    ),
  );
}

export function filterCategoriesByMarket(
  categories: Category[],
  products: Product[],
  selectedMarket: MarketCode,
): Category[] {
  const visibleProducts = filterProductsByMarket(products, selectedMarket);
  const categorySlugsWithProducts = new Set(
    visibleProducts.map((product) => product.categorySlug),
  );

  return categories
    .filter((category) =>
      isAvailableInMarket(
        getCategoryAvailableMarkets(category),
        selectedMarket,
      ),
    )
    .filter((category) => categorySlugsWithProducts.has(category.slug))
    .map((category) => ({
      ...category,
      productCount: visibleProducts.filter(
        (product) => product.categorySlug === category.slug,
      ).length,
    }));
}

export type VisibleCatalog = {
  categories: Category[];
  products: Product[];
};

/**
 * Single entry point used by UI hooks and future Sanity-backed loaders.
 */
export function getVisibleCatalog(
  categories: Category[],
  products: Product[],
  selectedMarket: MarketCode,
): VisibleCatalog {
  const filteredProducts = filterProductsByMarket(products, selectedMarket);
  const filteredCategories = filterCategoriesByMarket(
    categories,
    products,
    selectedMarket,
  );

  return {
    categories: filteredCategories,
    products: filteredProducts,
  };
}
