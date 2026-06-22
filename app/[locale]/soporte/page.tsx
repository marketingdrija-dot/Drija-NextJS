import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { SupportHelpSection } from "@/components/support/SupportHelpSection";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";
import { buildSupportHelpItems } from "@/lib/support/help-links";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.support.pageTitle,
    description: dict.support.pageDescription,
  };
}

export default async function SoportePage({ params }: PageProps) {
  const { locale, dict, href } = await getPageI18n(params);
  const categories = await getCms().getSupportCategories(locale);
  const helpItems = buildSupportHelpItems(dict, href);

  return (
    <>
      <PageHeader
        title={dict.support.pageTitle}
        description={dict.support.pageDescription}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {categories.map((category) => (
            <section
              key={category.id}
              className="rounded-2xl bg-white p-6"
            >
              <h2 className="text-xl font-bold text-neutral-900">
                {category.name}{" "}
                <span className="text-sm font-normal text-neutral-500">
                  ({category.articles.length})
                </span>
              </h2>
              <ul className="mt-4 space-y-3">
                {category.articles.map((article) => (
                  <li key={article.id}>
                    <details className="group rounded-lg bg-neutral-50 px-4 py-3">
                      <summary className="cursor-pointer font-medium text-neutral-800 marker:content-none">
                        <span className="flex items-center justify-between gap-4">
                          {article.question}
                          <span className="text-drija-green transition group-open:rotate-45">
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                        {article.answer}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <SupportHelpSection title={dict.support.needHelp} items={helpItems} />
    </>
  );
}
