import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getPageI18n(params);
  const post = await getCms().getBlogPostBySlug(slug, locale);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const { slug } = await params;
  const post = await getCms().getBlogPostBySlug(slug, locale);

  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href={href("/blog")}
        className="text-sm font-semibold text-drija-green hover:underline"
      >
        {dict.blog.backToBlog}
      </Link>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-drija-green">
        {post.categoryLabel}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        {formatDate(post.publishedAt, locale)} · {post.author}
      </p>

      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
        <OptimizedImage
          src={post.image.src}
          alt={post.image.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="prose-drija mt-8">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
