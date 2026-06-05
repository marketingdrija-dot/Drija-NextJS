import { ProductRowCarousel } from "@/components/categories/ProductRowCarousel";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "@/types/product";

type RelatedProductsProps = {
  products: Product[];
  locale: Locale;
  title: string;
  viewProductLabel: string;
};

export function RelatedProducts({
  products,
  locale,
  title,
  viewProductLabel,
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-bold uppercase tracking-[0.14em] text-neutral-900 sm:text-xl">
          {title}
        </h2>

        <div className="mt-8">
          <ProductRowCarousel
            products={products}
            locale={locale}
            viewProductLabel={viewProductLabel}
          />
        </div>
      </div>
    </section>
  );
}
