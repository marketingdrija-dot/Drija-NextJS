import type { BlogPost } from "@/types/blog";

const HOME_BLOG_LIMIT = 3;

/** Featured posts first, then most recent, up to `limit` for the home section. */
export function getHomeBlogPosts(posts: BlogPost[], limit = HOME_BLOG_LIMIT): BlogPost[] {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}
