import type { Metadata } from "next";
import { WhereToBuyContent } from "@/components/where-to-buy/WhereToBuyContent";
import { WhereToBuyHero } from "@/components/where-to-buy/WhereToBuyHero";
import { getCms } from "@/lib/cms";
import { getPageI18n } from "@/lib/i18n/server";
import { getWhereToBuyHero } from "@/lib/where-to-buy";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.retailers.pageTitle,
    description: dict.retailers.pageDescription,
  };
}

export default async function DondeComprarPage({ params }: PageProps) {
  const { locale, dict } = await getPageI18n(params);
  const hero = getWhereToBuyHero(locale);
  const countries = await getCms().getRetailers(locale);
  const r = dict.retailers;

  return (
    <>
      <WhereToBuyHero title={r.pageTitle} image={hero} />

      <WhereToBuyContent
        countries={countries}
        defaultCountryCode={countries[0]?.countryCode}
        labels={{
          sidebarTitle: r.sidebarTitle,
          visitWebsite: r.visitWebsite,
          technicalService: r.technicalService,
          expandCountry: r.expandCountry,
          collapseCountry: r.collapseCountry,
          noStores: r.noStores,
        }}
      />
    </>
  );
}
