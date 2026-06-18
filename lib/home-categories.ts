import type { Category } from "@/types/category";

export const HOME_CATEGORIES_COUNT = 6;

export function buildHomeCategories(allCategories: Category[]): Category[] {
  const picked: Category[] = [];
  const seen = new Set<string>();

  const add = (category: Category) => {
    if (seen.has(category.id)) return;
    seen.add(category.id);
    picked.push(category);
  };

  for (const category of allCategories) {
    if (category.featured) add(category);
  }

  const ordered = [...allCategories].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );

  for (const category of ordered) {
    if (picked.length >= HOME_CATEGORIES_COUNT) break;
    add(category);
  }

  return picked.slice(0, HOME_CATEGORIES_COUNT);
}
