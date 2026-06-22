import type { BlogCategory, BlogPost } from "@/types/blog";

export type BlogCategoryFilter = BlogCategory | "all";

export type BlogCategoryOption = {
  id: BlogCategoryFilter;
  label: string;
};

const CATEGORY_ORDER: BlogCategory[] = [
  "recetas-y-experiencias",
  "tecnologia-y-funcionalidades",
  "tendencias-y-estilo-de-vida",
];

export function getBlogCategoryOptions(
  posts: BlogPost[],
  allLabel: string,
): BlogCategoryOption[] {
  const labels = new Map<BlogCategory, string>();

  for (const post of posts) {
    if (!labels.has(post.category)) {
      labels.set(post.category, post.categoryLabel);
    }
  }

  const categories = CATEGORY_ORDER.filter((id) => labels.has(id)).map(
    (id) => ({
      id,
      label: labels.get(id)!,
    }),
  );

  return [{ id: "all", label: allLabel }, ...categories];
}

export function filterBlogPostsByCategory(
  posts: BlogPost[],
  category: BlogCategoryFilter,
): BlogPost[] {
  if (category === "all") return posts;
  return posts.filter((post) => post.category === category);
}

export function parseBlogCategoryFilter(
  value: string | string[] | undefined,
): BlogCategoryFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  if (
    raw === "recetas-y-experiencias" ||
    raw === "tecnologia-y-funcionalidades" ||
    raw === "tendencias-y-estilo-de-vida"
  ) {
    return raw;
  }
  return "all";
}
