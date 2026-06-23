import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";

import styles from "@/components/support/SupportFaqAccordion.module.css";

type PageProps = {
  params: Promise<{ locale: string; categorySlug: string; articleSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params;
  const { locale } = await getPageI18n(params);
  const result = await getCms().getSupportArticleBySlug(
    categorySlug,
    articleSlug,
    locale,
  );

  if (!result) return { title: "Not found" };

  return {
    title: result.article.question,
    description: result.article.answer.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const categories = await getCms().getSupportCategories("es");

  return categories.flatMap((category) =>
    category.articles.map((article) => ({
      categorySlug: category.slug,
      articleSlug: article.slug,
    })),
  );
}

export default async function SupportArticlePage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const { categorySlug, articleSlug } = await params;
  const result = await getCms().getSupportArticleBySlug(
    categorySlug,
    articleSlug,
    locale,
  );

  if (!result) notFound();

  const { category, article } = result;
  const paragraphs = article.answer.split("\n\n").filter(Boolean);

  return (
    <article className={styles.articlePage}>
      <Link href={href("/soporte")} className={styles.backLink}>
        {dict.support.backToSupport}
      </Link>

      <p className={styles.categoryLabel}>{category.name}</p>
      <h1 className={styles.articleTitle}>{article.question}</h1>

      <div className={styles.articleBody}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
