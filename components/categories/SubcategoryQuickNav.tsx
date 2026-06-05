"use client";

import { OptimizedImage } from "@/components/ui/OptimizedImage";
import type { Subcategory } from "@/types/subcategory";

type SubcategoryQuickNavProps = {
  subcategories: Subcategory[];
};

export function SubcategoryQuickNav({ subcategories }: SubcategoryQuickNavProps) {
  return (
    <nav
      aria-label="Subcategorías"
      className="border-b border-neutral-200 bg-white py-6"
    >
      <div className="mx-auto flex max-w-7xl justify-center gap-3 overflow-x-auto px-4 sm:gap-4 sm:px-6 lg:px-8">
        {subcategories.map((sub) => (
          <a
            key={sub.id}
            href={`#subcategoria-${sub.slug}`}
            className="flex min-w-[5.5rem] shrink-0 flex-col items-center gap-2 rounded-xl bg-neutral-50 px-3 py-3 transition sm:min-w-[6.5rem] sm:px-4"
          >
            <div className="relative h-14 w-14 sm:h-16 sm:w-16">
              <OptimizedImage
                src={sub.icon.src}
                alt={sub.icon.alt}
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </div>
            <span className="text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-700 sm:text-xs">
              {sub.name}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
