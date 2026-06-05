import categorySchema from "@/sanity/schemas/category";
import marketSchema from "@/sanity/schemas/market";
import productSchema from "@/sanity/schemas/product";

/** Register these in `sanity.config.ts` → schema.types */
export const sanitySchemaTypes = [marketSchema, categorySchema, productSchema];

export { categorySchema, marketSchema, productSchema };
