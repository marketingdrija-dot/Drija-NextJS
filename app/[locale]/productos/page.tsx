import type { Metadata } from "next";
import Link from "next/link";
import { FilteredCategoryGrid } from "@/components/catalog/FilteredCategoryGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { getFullCatalog } from "@/lib/cms/catalog";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.products.pageTitle,
    description: dict.products.pageDescription,
  };
}

export default async function ProductosPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const { categories, products } = await getFullCatalog(locale);

  return (
    <>
      <PageHeader
        title={dict.products.pageTitle}
        description={dict.products.pageDescription}
      >
        <Link
          href={`${href("/productos")}#catalogo`}
          className="inline-flex rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold uppercase tracking-wide hover:border-drija-green hover:text-drija-green"
        >
          {dict.products.viewCatalog}
        </Link>
      </PageHeader>

      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
      >
        <FilteredCategoryGrid
          categories={categories}
          products={products}
          emptyMessage={dict.market.emptyCatalog}
        />
      </section>
    </>
  );
}
