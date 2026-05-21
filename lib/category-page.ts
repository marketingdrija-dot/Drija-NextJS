import categoryPagesData from "@/data/category-pages.json";
import type { Locale } from "@/lib/i18n/config";
import { localizeSubcategory } from "@/lib/i18n/localize-subcategory";
import { getCms } from "@/lib/cms";
import type { CategoryPageConfig, CategoryPageData } from "@/types/category-page";
import type { Product } from "@/types/product";
import type { Subcategory } from "@/types/subcategory";

const pages = categoryPagesData as Record<string, CategoryPageConfig>;

export function getCategoryPageConfig(
  categorySlug: string,
): CategoryPageConfig | null {
  return pages[categorySlug] ?? null;
}

export async function getCategoryPageData(
  categorySlug: string,
  locale: Locale,
): Promise<CategoryPageData | null> {
  const config = getCategoryPageConfig(categorySlug);
  const cms = getCms();

  const [category, products] = await Promise.all([
    cms.getCategoryBySlug(categorySlug, locale),
    cms.getProducts({ categorySlug, locale }),
  ]);

  if (!category) return null;

  if (!config?.subcategories?.length) {
    return {
      category,
      config: {
        categorySlug,
        heroImage: category.image,
        subcategories: [],
      },
      productsBySubcategory: {},
      ungroupedProducts: products,
    };
  }

  const subcategories = config.subcategories
    .map((sub) => localizeSubcategory(sub, locale))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const productsBySubcategory = groupProductsBySubcategory(
    products,
    subcategories,
  );

  const assigned = new Set(
    Object.values(productsBySubcategory).flat().map((p) => p.id),
  );
  const ungroupedProducts = products.filter((p) => !assigned.has(p.id));

  return {
    category,
    config: {
      ...config,
      heroImage: config.heroImage,
      subcategories,
    },
    productsBySubcategory,
    ungroupedProducts,
  };
}

function groupProductsBySubcategory(
  products: Product[],
  subcategories: Subcategory[],
): Record<string, Product[]> {
  const map: Record<string, Product[]> = {};

  for (const sub of subcategories) {
    map[sub.slug] = [];
  }

  for (const product of products) {
    if (product.subcategorySlug && map[product.subcategorySlug]) {
      map[product.subcategorySlug].push(product);
    }
  }

  return map;
}

/** Localize raw config hero for metadata */
export function getLocalizedCategoryPageConfig(
  categorySlug: string,
  locale: Locale,
): CategoryPageConfig | null {
  const config = getCategoryPageConfig(categorySlug);
  if (!config) return null;

  return {
    ...config,
    subcategories: config.subcategories.map((s) =>
      localizeSubcategory(s, locale),
    ),
  };
}
