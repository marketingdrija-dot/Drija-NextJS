import type {
  BlogCategoryFilter,
  BlogCategoryOption,
} from "@/lib/blog/categories";
import { cn } from "@/lib/utils";

import styles from "./BlogPageContent.module.css";

type BlogCategoryTabsProps = {
  categories: BlogCategoryOption[];
  activeCategory: BlogCategoryFilter;
  onSelect: (category: BlogCategoryFilter) => void;
};

export function BlogCategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: BlogCategoryTabsProps) {
  return (
    <nav className={styles.tabsSection} aria-label="Categorías del blog">
      <div className={styles.tabsInner}>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={cn(
              styles.tab,
              activeCategory === category.id && styles.tabActive,
            )}
            aria-current={activeCategory === category.id ? "page" : undefined}
            onClick={() => onSelect(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
