import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import type { Product } from "@/types/product";

type CategoryProductRowProps = {
  product: Product;
  locale: Locale;
  viewProductLabel: string;
};

export function CategoryProductRow({
  product,
  locale,
  viewProductLabel,
}: CategoryProductRowProps) {
  const image = product.images[0];
  const href = localizePath(`/products/${product.slug}`, locale);

  return (
    <article className="flex min-w-[min(100%,320px)] shrink-0 items-center gap-4 rounded-lg bg-white p-3 sm:min-w-[380px] lg:min-w-[420px]">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100 sm:h-24 sm:w-24">
        {image && (
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            fill
            sizes="96px"
            className="object-contain p-1"
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-bold uppercase leading-snug text-neutral-900 sm:text-base">
          {product.name}
        </h3>
      </div>

      <Link
        href={href}
        className="shrink-0 rounded-full bg-drija-green px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-drija-green-dark sm:px-5 sm:py-2.5 sm:text-sm"
      >
        {viewProductLabel}
      </Link>
    </article>
  );
}
