"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useI18n } from "@/lib/i18n/context";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const { dict, href } = useI18n();

  return (
    <Link
      href={href(`/categories/${category.slug}`)}
      className="group flex flex-col overflow-hidden rounded-xl bg-white transition hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white">
        <OptimizedImage
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-drija-green">
          {category.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
          {category.description}
        </p>
        {typeof category.productCount === "number" && (
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            {category.productCount} {dict.products.productsCount}
          </p>
        )}
      </div>
    </Link>
  );
}
