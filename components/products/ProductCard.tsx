import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizePath } from "@/lib/i18n/paths";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
  locale: Locale;
};

export async function ProductCard({ product, locale }: ProductCardProps) {
  const dict = await getDictionary(locale);
  const image = product.images[0];
  const productHref = localizePath(`/products/${product.slug}`, locale);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-white transition hover:-translate-y-0.5">
      <Link
        href={productHref}
        className="relative block aspect-square overflow-hidden bg-neutral-100"
      >
        {image && (
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="transition duration-300 group-hover:scale-105"
          />
        )}
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-drija-green px-2 py-1 text-xs font-bold uppercase text-white">
            {dict.products.newBadge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          {product.sku}
        </p>
        <h3 className="mt-1 text-lg font-bold text-neutral-900">
          <Link href={productHref} className="hover:text-drija-green">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-neutral-600">
          {product.shortDescription}
        </p>
        <Link
          href={productHref}
          className="mt-4 inline-flex text-sm font-semibold text-drija-green hover:underline"
        >
          {dict.products.viewDetail}
        </Link>
      </div>
    </article>
  );
}
