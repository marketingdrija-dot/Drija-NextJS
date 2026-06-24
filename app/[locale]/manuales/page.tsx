import type { Metadata } from "next";
import { ManualsHero } from "@/components/manuals/ManualsHero";
import { ManualsPageContent } from "@/components/manuals/ManualsPageContent";
import {
  getProductManualSections,
  getProductManualsHero,
} from "@/lib/manuals/page";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.productManuals.pageTitle,
    description: dict.productManuals.pageDescription,
  };
}

export default async function ManualesPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const hero = getProductManualsHero(locale);
  const sections = getProductManualSections(locale);

  return (
    <>
      <ManualsHero title={dict.productManuals.pageTitle} image={hero} />
      <ManualsPageContent
        sections={sections}
        emptySectionLabel={dict.productManuals.emptySection}
        downloadManualTemplate={dict.productManuals.downloadManual}
      />
    </>
  );
}
