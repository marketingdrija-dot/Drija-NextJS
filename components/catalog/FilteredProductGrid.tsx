"use client";

import { ProductCard } from "@/components/products/ProductCard";
import { useVisibleCatalog } from "@/hooks/useVisibleCatalog";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
type FilteredProductGridProps = {
  categories: Category[];
  products: Product[];
  limit?: number;
  emptyMessage?: string;
  className?: string;
};

export function FilteredProductGrid({
  categories,
  products,
  limit,
  emptyMessage,
  className = "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
}: FilteredProductGridProps) {
  const { products: visibleProducts, hasHydrated } = useVisibleCatalog(
    categories,
    products,
  );

  const items = limit ? visibleProducts.slice(0, limit) : visibleProducts;

  if (!hasHydrated) {
    return (
      <div className={className}>
        {products.slice(0, limit ?? 4).map((product) => (
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
