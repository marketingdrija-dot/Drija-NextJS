import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductFeatureBlocks } from "@/components/products/ProductFeatureBlocks";
import { ProductMainCard } from "@/components/products/ProductMainCard";
import { ProductPageHero } from "@/components/products/ProductPageHero";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";
import { getProductHeroImage, getRelatedProducts } from "@/lib/product-page";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getPageI18n(params);
  const product = await getCms().getProductBySlug(slug, locale);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const { slug } = await params;
  const product = await getCms().getProductBySlug(slug, locale);

  if (!product) notFound();

  const [category, heroImage, relatedProducts] = await Promise.all([
    getCms().getCategoryBySlug(product.categorySlug, locale),
    getProductHeroImage(product.categorySlug, locale),
    getRelatedProducts(product, locale),
  ]);

  const pd = dict.products;

  return (
    <>
      {heroImage && <ProductPageHero image={heroImage} />}

      <div className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <nav
            className="mb-6 text-sm text-neutral-500"
            aria-label="Breadcrumb"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href={href("/productos")}
                  className="hover:text-drija-green"
                >
                  {pd.breadcrumbProducts}
                </Link>
              </li>
              {category && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={href(`/categories/${category.slug}`)}
                      className="hover:text-drija-green"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-neutral-800">{product.name}</li>
            </ol>
          </nav>

          <ProductMainCard
            product={product}
            buyHref={href("/donde-comprar")}
            buyLabel={pd.buy}
            specsTitle={pd.technicalSpecs}
            prevImageLabel={pd.prevImage}
            nextImageLabel={pd.nextImage}
          />
        </div>
      </div>

      {product.features && product.features.length > 0 && (
        <ProductFeatureBlocks features={product.features} />
      )}

      <RelatedProducts
        products={relatedProducts}
        locale={locale}
        title={pd.relatedProducts}
        viewProductLabel={pd.buy}
      />
    </>
  );
}
