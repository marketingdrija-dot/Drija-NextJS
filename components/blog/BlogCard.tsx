import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

type BlogCardProps = {
  post: BlogPost;
  locale: Locale;
};

export function BlogCard({ post, locale }: BlogCardProps) {
  const postHref = localizePath(`/blog/${post.slug}`, locale);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white transition hover:-translate-y-0.5">
      <Link
        href={postHref}
        className="relative block aspect-[16/10] overflow-hidden bg-neutral-100"
      >
        <OptimizedImage
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-drija-green">
          {post.categoryLabel}
        </p>
        <h3 className="mt-2 text-xl font-bold text-neutral-900">
          <Link href={postHref} className="hover:text-drija-green">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-neutral-600">
          {post.excerpt}
        </p>
        <p className="mt-4 text-xs text-neutral-500">
          {formatDate(post.publishedAt, locale)} · {post.author}
        </p>
      </div>
    </article>
  );
}
