"use client";

import { HomeCategoryCard } from "@/components/home/HomeCategoryCard";
import { useVisibleCatalog } from "@/hooks/useVisibleCatalog";
import { HOME_CATEGORIES_COUNT } from "@/lib/home-categories";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

type HomeCategoryGridProps = {
  categories: Category[];
  products: Product[];
  emptyMessage: string;
};

export function HomeCategoryGrid({
  categories,
  products,
  emptyMessage,
}: HomeCategoryGridProps) {
  const { categories: visibleCategories, hasHydrated } = useVisibleCatalog(
    categories,
    products,
  );

  const items = visibleCategories.slice(0, HOME_CATEGORIES_COUNT);

  if (!hasHydrated) {
    return (
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {categories.slice(0, HOME_CATEGORIES_COUNT).map((category) => (
          <div
            key={category.id}
            className="h-40 animate-pulse rounded-2xl bg-neutral-200 sm:h-44"
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="mt-8 text-center text-neutral-600" role="status">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.map((category) => (
        <HomeCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
