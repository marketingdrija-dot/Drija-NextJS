"use client";

import { CategoryCard } from "@/components/products/CategoryCard";
import { useVisibleCatalog } from "@/hooks/useVisibleCatalog";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type FilteredCategoryGridProps = {
  categories: Category[];
  products: Product[];
  emptyMessage: string;
  className?: string;
};

/**
 * Example listing: categories filtered by selected market and visible products.
 * Server passes the full catalog once; client applies market rules via Zustand.
 */
export function FilteredCategoryGrid({
  categories,
  products,
  emptyMessage,
  className = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}: FilteredCategoryGridProps) {
  const { categories: visibleCategories, hasHydrated } = useVisibleCatalog(
    categories,
    products,
  );

  if (!hasHydrated) {
    return (
      <div className={className}>
        {categories.slice(0, 8).map((category) => (
          <div
            key={category.id}
            className="h-64 animate-pulse rounded-xl bg-neutral-200"
          />
        ))}
      </div>
    );
  }

  if (visibleCategories.length === 0) {
    return (
      <p className="text-center text-neutral-600" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={className}>
      {visibleCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
