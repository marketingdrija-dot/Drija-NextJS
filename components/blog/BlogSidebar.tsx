import type { BlogCategoryFilter, BlogCategoryOption } from "@/lib/blog/categories";
import { cn } from "@/lib/utils";

import styles from "./BlogSidebar.module.css";

type BlogSidebarProps = {
  sidebarTitle: string;
  categories: BlogCategoryOption[];
  activeCategory: BlogCategoryFilter;
  onSelect: (category: BlogCategoryFilter) => void;
};

export function BlogSidebar({
  sidebarTitle,
  categories,
  activeCategory,
  onSelect,
}: BlogSidebarProps) {
  return (
    <aside className={styles.sidebar} aria-label={sidebarTitle}>
      <p className={styles.badge}>{sidebarTitle}</p>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {categories.map((category) => (
            <li key={category.id} className={styles.item}>
              <button
                type="button"
                className={cn(
                  styles.link,
                  activeCategory === category.id && styles.linkActive,
                )}
                aria-current={activeCategory === category.id ? "page" : undefined}
                onClick={() => onSelect(category.id)}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
