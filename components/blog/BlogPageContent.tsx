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
import type { Dictionary } from "@/lib/i18n/types";
import type { BlogPost } from "@/types/blog";

import styles from "./BlogPageContent.module.css";

type BlogPageContentProps = {
  posts: BlogPost[];
  locale: Locale;
  dict: Dictionary;
  initialCategory: BlogCategoryFilter;
};

export function BlogPageContent({
  posts,
  locale,
  dict,
  initialCategory,
}: BlogPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const activeCategory = parseBlogCategoryFilter(
    searchParams.get("category") ?? initialCategory,
  );

  const categories = useMemo(
    () => getBlogCategoryOptions(posts, dict.blog.allCategories),
    [dict.blog.allCategories, posts],
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
      {isAllView ? <BlogHero locale={locale} /> : null}

      {isAllView ? (
        <BlogCategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategoryChange}
        />
      ) : null}

      {isAllView ? (
        <section className={styles.gridSection} aria-label={dict.blog.pageTitle}>
          {filteredPosts.length === 0 ? (
            <p className={styles.empty}>{dict.blog.emptyCategory}</p>
          ) : (
            <div className={styles.grid}>
              {filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  readMoreLabel={dict.blog.readMore}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <div className={styles.categoryLayout}>
          <BlogSidebar
            sidebarTitle={dict.blog.sidebarTitle}
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategoryChange}
          />

          <section className={styles.categoryPosts} aria-label={dict.blog.pageTitle}>
            {filteredPosts.length === 0 ? (
              <p className={styles.empty}>{dict.blog.emptyCategory}</p>
            ) : (
              filteredPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  readMoreLabel={dict.blog.readMore}
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
