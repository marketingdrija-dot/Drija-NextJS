import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPageI18n } from "@/lib/i18n/server";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { dict } = await getPageI18n(params);
  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
  };
}

export default async function ContactoPage({ params }: PageProps) {
  const { dict, href } = await getPageI18n(params);

  return (
    <>
      <ContactForm />

      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
            {dict.contact.needHelp}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                href={href("/soporte")}
                className="font-semibold text-drija-green hover:underline"
              >
                {dict.contact.faq}
              </Link>
            </li>
            <li>
              <Link
                href={href("/donde-comprar")}
                className="font-semibold text-drija-green hover:underline"
              >
                {dict.contact.technicalService}
              </Link>
            </li>
            <li>
              <Link
                href={href("/productos")}
                className="font-semibold text-drija-green hover:underline"
              >
                {dict.contact.catalogs}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
