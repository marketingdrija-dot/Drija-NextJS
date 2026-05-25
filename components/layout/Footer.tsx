"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const { dict, href } = useI18n();

  const footerLinks = [
    { href: href("/productos"), label: dict.nav.products },
    { href: href("/blog"), label: dict.nav.blog },
    { href: href("/donde-comprar"), label: dict.nav.whereToBuy },
    { href: href("/soporte"), label: dict.nav.support },
    { href: href("/contacto"), label: dict.nav.contact },
    { href: href(siteConfig.legal.termsUrl), label: dict.footer.legal },
  ];

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href={href("/")} aria-label={dict.common.homeLabel}>
              <Image
                src="/logo-drija-blanco.svg"
                alt="DRIJA"
                width={140}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          <nav aria-label="Enlaces del sitio">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {dict.footer.explore}
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-drija-green"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {dict.footer.needHelp}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={href("/soporte")} className="hover:text-drija-green">
                  {dict.footer.faq}
                </Link>
              </li>
              <li>
                <Link
                  href={href("/donde-comprar")}
                  className="hover:text-drija-green"
                >
                  {dict.footer.technicalService}
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-drija-green"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-neutral-700 pt-6 text-center text-xs text-neutral-500">
          © {year} {siteConfig.name}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
