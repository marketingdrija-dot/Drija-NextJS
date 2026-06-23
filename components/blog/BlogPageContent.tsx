"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BlogCategoryTabs } from "@/components/blog/BlogCategoryTabs";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  filterBlogPostsByCategory,
  getBlogCategoryOptions,
  parseBlogCategoryFilter,
  type BlogCategoryFilter,
} from "@/lib/blog/categories";
import type { Locale } from "@/lib/i18n/config";
import { useBlogLocaleStore } from "@/stores/blog-locale-store";
import type { BlogLabelsByLocale, BlogPostsByLocale } from "@/types/blog-page";

import styles from "./BlogPageContent.module.css";

type BlogPageContentProps = {
  postsByLocale: BlogPostsByLocale;
  blogLabelsByLocale: BlogLabelsByLocale;
  initialCategory: BlogCategoryFilter;
};

export function BlogPageContent({
  postsByLocale,
  blogLabelsByLocale,
  initialCategory,
}: BlogPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const displayLocale = useBlogLocaleStore((state) => state.displayLocale);

  const activeCategory = parseBlogCategoryFilter(
    searchParams.get("category") ?? initialCategory,
  );

  const posts = postsByLocale[displayLocale];
  const blogLabels = blogLabelsByLocale[displayLocale];

  const categories = useMemo(
    () => getBlogCategoryOptions(posts, blogLabels.allCategories),
    [blogLabels.allCategories, posts],
  );

  const filteredPosts = useMemo(
    () => filterBlogPostsByCategory(posts, activeCategory),
    [activeCategory, posts],
  );

  const isAllView = activeCategory === "all";

  const handleCategoryChange = (category: BlogCategoryFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  return (
    <div className={styles.page}>
      {isAllView ? <BlogHero locale={displayLocale} /> : null}

      {isAllView ? (
        <BlogCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategoryChange}
        />
      ) : null}

      {isAllView ? (
        <section className={styles.gridSection} aria-label={blogLabels.pageTitle}>
          {filteredPosts.length === 0 ? (
            <p className={styles.empty}>{blogLabels.emptyCategory}</p>
          ) : (
            <div className={styles.grid}>
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale={displayLocale}
                  readMoreLabel={blogLabels.readMore}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <div className={styles.categoryLayout}>
          <BlogSidebar
            sidebarTitle={blogLabels.sidebarTitle}
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategoryChange}
          />

          <section
            className={styles.categoryPosts}
            aria-label={blogLabels.pageTitle}
          >
            {filteredPosts.length === 0 ? (
              <p className={styles.empty}>{blogLabels.emptyCategory}</p>
            ) : (
              filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale={displayLocale}
                  readMoreLabel={blogLabels.readMore}
                  variant="featured"
                />
              ))
            )}
          </section>
        </div>
      )}
    </div>
  );
}
