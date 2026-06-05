import { getCategoryPageConfig } from "@/lib/category-page";
import { getCms } from "@/lib/cms";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/types/product";

const RELATED_LIMIT = 8;

export async function getProductHeroImage(
  categorySlug: string,
  locale: Locale,
): Promise<{ src: string; alt: string } | null> {
  const config = getCategoryPageConfig(categorySlug);
  if (config?.heroImage) return config.heroImage;

  const category = await getCms().getCategoryBySlug(categorySlug, locale);
  return category?.image ?? null;
}

export async function getRelatedProducts(
  product: Product,
  locale: Locale,
): Promise<Product[]> {
  const cms = getCms();

  if (product.relatedSlugs?.length) {
    const resolved = await Promise.all(
      product.relatedSlugs.map((slug) => cms.getProductBySlug(slug, locale)),
    );
    return resolved.filter((p): p is Product => p != null && p.id !== product.id);
  }

  const sameCategory = await cms.getProducts({
    categorySlug: product.categorySlug,
    locale,
  });

  const sameSubcategory = product.subcategorySlug
    ? sameCategory.filter((p) => p.subcategorySlug === product.subcategorySlug)
    : sameCategory;

  const pool =
    sameSubcategory.length > 1
      ? sameSubcategory
      : sameCategory.length > 1
        ? sameCategory
        : [];

  return pool.filter((p) => p.id !== product.id).slice(0, RELATED_LIMIT);
}
