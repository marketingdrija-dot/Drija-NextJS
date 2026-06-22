import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

import styles from "./BlogPostCard.module.css";

type BlogPostCardProps = {
  post: BlogPost;
  locale: Locale;
  readMoreLabel: string;
  variant?: "grid" | "featured";
};

export function BlogPostCard({
  post,
  locale,
  readMoreLabel,
  variant = "grid",
}: BlogPostCardProps) {
  const postHref = localizePath(`/blog/${post.slug}`, locale);

  return (
    <article className={cn(styles.card, variant === "featured" && styles.featured)}>
      <Link href={postHref} className={styles.imageLink}>
        <OptimizedImage
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes={
            variant === "featured"
              ? "(min-width: 1024px) 60vw, 100vw"
              : "(min-width: 768px) 45vw, 100vw"
          }
          className={styles.image}
        />
      </Link>

      <div className={styles.body}>
        <p className={styles.category}>&gt; {post.categoryLabel}</p>
        <h2 className={styles.title}>
          <Link href={postHref} className={styles.titleLink}>
            {post.title}
          </Link>
        </h2>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <Link href={postHref} className={styles.cta}>
          {readMoreLabel}
        </Link>
      </div>
    </article>
  );
}
