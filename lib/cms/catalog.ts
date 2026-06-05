import { getCms } from "@/lib/cms";
import type { Locale } from "@/lib/i18n/config";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export type FullCatalog = {
  categories: Category[];
  products: Product[];
};

/**
 * Loads the complete catalog once. Client-side market filtering is applied
 * via Zustand + `getVisibleCatalog`. The same pattern works when swapping
 * this loader for Sanity GROQ queries.
 */
export async function getFullCatalog(locale: Locale): Promise<FullCatalog> {
  const cms = getCms();
  const [categories, products] = await Promise.all([
    cms.getCategories(locale),
    cms.getProducts({ locale }),
  ]);

  return { categories, products };
}
