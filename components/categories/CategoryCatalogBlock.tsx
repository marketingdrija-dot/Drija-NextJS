import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { CategoryCatalog } from "@/types/category-page";

type CategoryCatalogBlockProps = {
  catalog: CategoryCatalog;
  title: string;
  viewOnlineLabel: string;
  downloadLabel: string;
  onlineHref: string;
  downloadHref?: string;
};

export function CategoryCatalogBlock({
  catalog,
  title,
  viewOnlineLabel,
  downloadLabel,
  onlineHref,
  downloadHref,
}: CategoryCatalogBlockProps) {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold uppercase tracking-wide text-neutral-900">
          {title}
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={onlineHref}
            className="inline-flex rounded-full bg-drija-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-drija-green-dark"
          >
            {viewOnlineLabel}
          </Link>
          {downloadHref && (
            <Link
              href={downloadHref}
              className="inline-flex rounded-full border-2 border-drija-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-drija-green transition hover:bg-drija-green hover:text-white"
            >
              {downloadLabel}
            </Link>
          )}
        </div>

        {catalog.image && (
          <div className="relative mx-auto mt-8 aspect-[16/7] max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <OptimizedImage
              src={catalog.image.src}
              alt={catalog.image.alt}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
