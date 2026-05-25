import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { HeroSection } from "@/components/home/HeroSection";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryCard } from "@/components/products/CategoryCard";
import { ProductCard } from "@/components/products/ProductCard";
import { getCms } from "@/lib/cms";
import { getHeroSlides } from "@/lib/hero";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const cms = getCms();
  const [categories, newProducts, featuredPosts] = await Promise.all([
    cms.getCategories(locale),
    cms.getProducts({ featured: true, locale }),
    cms.getBlogPosts({ featured: true, locale }),
  ]);

  const featuredCategories = categories.filter((c) => c.featured).slice(0, 6);
  const heroSlides = getHeroSlides(locale);

  return (
    <>
      <HeroSection slides={heroSlides} />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-drija-green">
              {dict.home.categories}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-900">
              {dict.home.categoriesTitle}
            </h2>
          </div>
          <Link
            href={href("/productos")}
            className="hidden text-sm font-semibold text-drija-green hover:underline sm:inline"
          >
            {dict.home.viewAll}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} locale={locale} />
          ))}
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-drija-green">
              {dict.home.newArrivals}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-900">
              {dict.home.featuredTitle}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-drija-green">
              {dict.home.worldDrija}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-neutral-900">
              {dict.home.blogTitle}
            </h2>
          </div>
          <Link
            href={href("/blog")}
            className="text-sm font-semibold text-drija-green hover:underline"
          >
            {dict.home.viewBlog}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </section>

      <ContactForm />
    </>
  );
}
