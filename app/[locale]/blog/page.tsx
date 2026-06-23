import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { parseBlogCategoryFilter } from "@/lib/blog/categories";
import { getCms } from "@/lib/cms";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPageI18n } from "@/lib/i18n/server";
import type { BlogLabelsByLocale, BlogPostsByLocale } from "@/types/blog-page";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.blog.pageTitle,
    description: dict.blog.pageDescription,
  };
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { category } = await searchParams;
  const initialCategory = parseBlogCategoryFilter(category);

  const [postsEs, postsEn, dictEs, dictEn] = await Promise.all([
    getCms().getBlogPosts({ locale: "es" }),
    getCms().getBlogPosts({ locale: "en" }),
    getDictionary("es"),
    getDictionary("en"),
  ]);

  const postsByLocale: BlogPostsByLocale = {
    es: postsEs,
    en: postsEn,
  };

  const blogLabelsByLocale: BlogLabelsByLocale = {
    es: dictEs.blog,
    en: dictEn.blog,
  };

  return (
    <Suspense fallback={null}>
      <BlogPageContent
        postsByLocale={postsByLocale}
        blogLabelsByLocale={blogLabelsByLocale}
        initialCategory={initialCategory}
      />
    </Suspense>
  );
}
