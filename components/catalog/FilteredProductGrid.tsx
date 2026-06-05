"use client";

import { useMemo } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { useVisibleCatalog } from "@/hooks/useVisibleCatalog";
import { getVisibleCatalog } from "@/lib/markets/filter";
import { sortProductsByPriority } from "@/lib/home-featured";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type FilteredProductGridProps = {
  categories: Category[];
  products: Product[];
  allProducts?: Product[];
  limit?: number;
  fillMin?: number;
  prioritySlugs?: string[];
  emptyMessage?: string;
  className?: string;
};

export function FilteredProductGrid({
  categories,
  products,
  allProducts,
  limit,
  fillMin,
  prioritySlugs = [],
  emptyMessage,
  className = "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
}: FilteredProductGridProps) {
  const { products: visibleProducts, marketCode, hasHydrated } =
    useVisibleCatalog(categories, products);

  const displayCount = limit ?? fillMin ?? 4;

  const items = useMemo(() => {
    const targetCount = limit ?? fillMin ?? visibleProducts.length;
    let list = sortProductsByPriority(visibleProducts, prioritySlugs);

    if (fillMin && list.length < fillMin && allProducts) {
      const backfillPool = sortProductsByPriority(
        getVisibleCatalog(categories, allProducts, marketCode).products,
        prioritySlugs,
      );

      for (const product of backfillPool) {
        if (list.length >= targetCount) break;
        if (!list.some((item) => item.id === product.id)) {
          list.push(product);
        }
      }
    }

    return limit ? list.slice(0, limit) : list;
  }, [
    allProducts,
    categories,
    fillMin,
    limit,
    marketCode,
    prioritySlugs,
    visibleProducts,
  ]);

  if (!hasHydrated) {
    return (
      <div className={className}>
        {products.slice(0, displayCount).map((product) => (
          <div
            key={product.id}
            className="h-72 animate-pulse rounded-xl bg-neutral-200"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0 && emptyMessage) {
    return (
      <p className="mt-8 text-center text-neutral-600" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={className}>
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
