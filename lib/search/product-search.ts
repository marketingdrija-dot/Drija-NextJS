import Fuse from "fuse.js";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export type ProductSearchHit = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  categoryName: string;
  categorySlug: string;
  shortDescription: string;
  imageSrc: string;
  imageAlt: string;
  url: string;
};

export function buildProductSearchIndex(
  products: Product[],
  categories: Category[],
  href: (path: string) => string,
): ProductSearchHit[] {
  const categoryBySlug = new Map(
    categories.map((category) => [category.slug, category.name]),
  );

  return products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    categoryName:
      categoryBySlug.get(product.categorySlug) ?? product.categorySlug,
    categorySlug: product.categorySlug,
    shortDescription: product.shortDescription,
    imageSrc: product.images[0]?.src ?? "",
    imageAlt: product.images[0]?.alt ?? product.name,
    url: href(`/products/${product.slug}`),
  }));
}

export function createProductSearchIndex(items: ProductSearchHit[]) {
  return new Fuse(items, {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "sku", weight: 0.3 },
      { name: "categoryName", weight: 0.2 },
      { name: "shortDescription", weight: 0.1 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
}

export function searchProducts(
  fuse: Fuse<ProductSearchHit>,
  query: string,
  limit = 8,
): ProductSearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  return fuse.search(trimmed, { limit }).map((result) => result.item);
}
