"use client";

import Link from "next/link";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { useI18n } from "@/lib/i18n/context";
import type { Category } from "@/types/category";

type HomeCategoryCardProps = {
  category: Category;
};

export function HomeCategoryCard({ category }: HomeCategoryCardProps) {
  const { dict, href } = useI18n();
  const categoryHref = href(`/categories/${category.slug}`);

  return (
    <article className="flex overflow-hidden rounded-2xl bg-white py-5">
      <div className="relative flex min-h-[9.5rem] w-[42%] shrink-0 items-center justify-center bg-white sm:min-h-[10.5rem]">
        <OptimizedImage
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(max-width: 768px) 40vw, 20vw"
          className="object-contain object-center p-3 sm:p-4"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-5 sm:px-6 sm:py-6">
        <h3 className="text-base font-bold uppercase leading-tight tracking-wide text-neutral-900 sm:text-lg">
          {category.name}
        </h3>
        <Link
          href={categoryHref}
          className="mt-4 inline-flex w-fit rounded-full bg-drija-green px-5 py-2.5 text-[0.6875rem] font-bold uppercase tracking-wide text-white transition hover:bg-drija-green-dark sm:px-6 sm:text-xs"
        >
          {dict.home.viewCategoryAll}
        </Link>
      </div>
    </article>
  );
}
