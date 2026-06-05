/**
 * Sanity Studio schema — Category with market availability.
 */
export const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    { name: "description", title: "Description", type: "text" },
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    {
      name: "availableMarkets",
      title: "Available markets",
      type: "array",
      of: [{ type: "reference", to: [{ type: "market" }] }],
      description:
        'Use a single reference with code "ALL" (or equivalent flag) for global availability.',
    },
    { name: "order", title: "Sort order", type: "number" },
    { name: "featured", title: "Featured on home", type: "boolean" },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
} as const;

export default categorySchema;
