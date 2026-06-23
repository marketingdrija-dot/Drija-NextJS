import type { Metadata } from "next";
import { SupportPageContent } from "@/components/support/SupportPageContent";
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
    <SupportPageContent
      categories={categories}
      helpTitle={dict.support.needHelp}
      helpItems={helpItems}
    />
  );
}
