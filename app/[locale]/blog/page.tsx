import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { parseBlogCategoryFilter } from "@/lib/blog/categories";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";

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
  const { locale, dict } = await getPageI18n(params);
  const { category } = await searchParams;
  const posts = await getCms().getBlogPosts({ locale });
  const initialCategory = parseBlogCategoryFilter(category);

  return (
    <Suspense fallback={null}>
      <BlogPageContent
        posts={posts}
        locale={locale}
        dict={dict}
        initialCategory={initialCategory}
      />
    </Suspense>
  );
}
