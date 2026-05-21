import { ProductRowCarousel } from "@/components/categories/ProductRowCarousel";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/types/product";
import type { Subcategory } from "@/types/subcategory";

type SubcategorySectionProps = {
  subcategory: Subcategory;
  products: Product[];
  locale: Locale;
  viewProductLabel: string;
};

export function SubcategorySection({
  subcategory,
  products,
  locale,
  viewProductLabel,
}: SubcategorySectionProps) {
  if (products.length === 0) return null;

  return (
    <section
      id={`subcategoria-${subcategory.slug}`}
      className="scroll-mt-24 border-b border-neutral-100 py-10 last:border-b-0"
    >
      <div className="mb-6 flex items-center gap-4">
        <h2 className="shrink-0 text-lg font-bold uppercase tracking-wide text-neutral-900 sm:text-xl">
          {subcategory.name}
        </h2>
        <div className="h-px flex-1 bg-neutral-300" aria-hidden />
      </div>

      <ProductRowCarousel
        products={products}
        locale={locale}
        viewProductLabel={viewProductLabel}
      />
    </section>
  );
}
