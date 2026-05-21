import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/paths";
import type { Category } from "@/types/category";

type RelatedCategoriesStripProps = {
  categories: Category[];
  locale: Locale;
  currentSlug: string;
  categoriesTabLabel: string;
  newArrivalsTabLabel: string;
};

export function RelatedCategoriesStrip({
  categories,
  locale,
  currentSlug,
  categoriesTabLabel,
  newArrivalsTabLabel,
}: RelatedCategoriesStripProps) {
  const related = categories
    .filter((c) => c.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center gap-8 border-b border-neutral-200">
          <span className="border-b-2 border-drija-green pb-3 text-sm font-bold uppercase tracking-wide text-drija-green">
            {categoriesTabLabel}
          </span>
          <span className="pb-3 text-sm font-bold uppercase tracking-wide text-neutral-400">
            {newArrivalsTabLabel}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {related.map((category) => (
            <Link
              key={category.id}
              href={localizePath(`/categories/${category.slug}`, locale)}
              className="group relative aspect-[2/1] overflow-hidden rounded-lg"
            >
              <OptimizedImage
                src={category.image.src}
                alt={category.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold uppercase tracking-widest text-white sm:text-2xl">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
