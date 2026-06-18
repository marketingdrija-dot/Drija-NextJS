import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedTabsSection } from "@/components/home/FeaturedTabsSection";
import { MundoDrijaSlider } from "@/components/home/MundoDrijaSlider";
import { BlogCard } from "@/components/blog/BlogCard";
import { HomeCategoryGrid } from "@/components/home/HomeCategoryGrid";
import { getCms } from "@/lib/cms";
import { getFullCatalog } from "@/lib/cms/catalog";
import { getHomeBlogPosts } from "@/lib/blog-home";
import { getFeaturedSlidesData } from "@/lib/featured-slides";
import { getHeroSlides } from "@/lib/hero";
import { getMundoDrijaSlides } from "@/lib/mundo-drija";
import { buildHomeCategories } from "@/lib/home-categories";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const [{ categories, products }, blogPosts] = await Promise.all([
    getFullCatalog(locale),
    getCms().getBlogPosts({ locale }),
  ]);
  const homeBlogPosts = getHomeBlogPosts(blogPosts);

  const homeCategories = buildHomeCategories(categories);
  const heroSlides = getHeroSlides(locale);
  const mundoDrijaSlides = getMundoDrijaSlides();
  const featuredSlides = getFeaturedSlidesData(locale);

  return (
    <>
      <HeroSection slides={heroSlides} />

      <section className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
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
        <HomeCategoryGrid
          categories={homeCategories}
          products={products}
          emptyMessage={dict.market.emptyCatalog}
        />
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
          {homeBlogPosts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </section>

      <FeaturedTabsSection
        categoriasSlides={featuredSlides.categorias}
        nuevoSlides={featuredSlides.nuevo}
        categoriesLabel={dict.home.categories}
        newArrivalsLabel={dict.home.newArrivals}
        prevLabel={dict.home.featuredPrev}
        nextLabel={dict.home.featuredNext}
        carouselLabel={dict.home.featuredCarousel}
      />

      <MundoDrijaSlider
        title={dict.home.worldDrija}
        slides={mundoDrijaSlides}
        prevLabel={dict.home.mundoDrijaPrev}
        nextLabel={dict.home.mundoDrijaNext}
        carouselLabel={dict.home.mundoDrijaCarousel}
      />

      <ContactForm />
    </>
  );
}
