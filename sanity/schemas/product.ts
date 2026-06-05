/**
 * Sanity Studio schema — Product (single document, no per-country duplicates).
 */
export const productSchema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    },
    { name: "sku", title: "SKU", type: "string" },
    { name: "shortDescription", title: "Short description", type: "text" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    },
    {
      name: "availableMarkets",
      title: "Available markets",
      type: "array",
      of: [{ type: "reference", to: [{ type: "market" }] }],
      description:
        "One product document. Assign markets where it is sold. Use ALL for every market.",
    },
    {
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    },
    {
      name: "features",
      title: "Feature blocks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            { name: "image", title: "Image", type: "image" },
          ],
        },
      ],
    },
    { name: "featured", title: "Featured", type: "boolean" },
    { name: "isNew", title: "New", type: "boolean" },
  ],
  preview: {
    select: { title: "title", media: "images.0", subtitle: "sku" },
  },
} as const;

export default productSchema;
