import type { Product } from "@/types/product";

export const HOME_FEATURED_PRIORITY_SLUG = "extractores-sottile-90-b";
export const HOME_FEATURED_MIN = 4;

export function buildHomeFeaturedProducts(allProducts: Product[]): Product[] {
  const bySlug = new Map(allProducts.map((product) => [product.slug, product]));
  const picked: Product[] = [];
  const seen = new Set<string>();

  const add = (product: Product | undefined) => {
    if (!product || seen.has(product.id)) return;
    seen.add(product.id);
    picked.push(product);
  };

  add(bySlug.get(HOME_FEATURED_PRIORITY_SLUG));

  for (const product of allProducts) {
    if (product.featured && product.slug !== HOME_FEATURED_PRIORITY_SLUG) {
      add(product);
    }
  }

  for (const product of allProducts) {
    if (picked.length >= HOME_FEATURED_MIN * 2) break;
    add(product);
  }

  return picked;
}

export function sortProductsByPriority(
  products: Product[],
  prioritySlugs: string[],
): Product[] {
  if (!prioritySlugs.length) return products;

  return [...products].sort((a, b) => {
    const aIndex = prioritySlugs.indexOf(a.slug);
    const bIndex = prioritySlugs.indexOf(b.slug);
    const aPriority = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const bPriority = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
    return aPriority - bPriority;
  });
}
