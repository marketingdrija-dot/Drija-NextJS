import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { Subcategory } from "@/types/subcategory";

export type CategoryCatalog = {
  onlineUrl: string;
  downloadUrl?: string;
  image?: { src: string; alt: string };
};

export type CategoryPageConfig = {
  categorySlug: string;
  heroImage: { src: string; alt: string };
  catalog?: CategoryCatalog;
  subcategories: Subcategory[];
};

export type CategoryPageData = {
  category: Category;
  config: CategoryPageConfig;
  productsBySubcategory: Record<string, Product[]>;
  /** Productos sin subcategoría asignada */
  ungroupedProducts: Product[];
};
