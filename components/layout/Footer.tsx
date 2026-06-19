"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { buildFooterCategories } from "@/lib/footer/build-footer-categories";
import { useI18n } from "@/lib/i18n/context";
import { siteConfig } from "@/lib/site";

import styles from "./Footer.module.css";

export function Footer() {
  const { dict, href, locale } = useI18n();

  const { left, right } = useMemo(
    () => buildFooterCategories(locale, href),
    [href, locale],
  );

  const infoLinks = [
    { href: href("/soporte"), label: dict.footer.faq, external: false },
    { href: href("/productos"), label: dict.footer.catalogs, external: false },
    { href: href("/contacto"), label: dict.footer.workWithUs, external: false },
    {
      href: siteConfig.social.instagram,
      label: dict.footer.socialNetworks,
      external: true,
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link
            href={href("/")}
            className={styles.logoLink}
            aria-label={dict.common.homeLabel}
          >
            <Image
              src="/logo-drija-blanco.svg"
              alt="DRIJA"
              width={151}
              height={38}
              className={styles.logo}
              style={{ width: "auto", height: "2.375rem" }}
              priority
            />
          </Link>
          <Link href={href(siteConfig.legal.termsUrl)} className={styles.legalLink}>
            {dict.footer.legal}
          </Link>
        </div>

        <div className={styles.categoriesCol}>
          <p className={styles.categoriesTitle}>{dict.footer.categories}</p>
          <ul className={styles.categoryList}>
            {left.map((category) => (
              <li key={category.href}>
                <Link href={category.href} className={styles.categoryLink}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${styles.categoriesCol} ${styles.categoriesColContinuation}`}
        >
          <ul className={styles.categoryList}>
            {right.map((category) => (
              <li key={category.href}>
                <Link href={category.href} className={styles.categoryLink}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.infoColumn} aria-label={dict.footer.infoNav}>
          <ul className={styles.infoList}>
            {infoLinks.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    className={styles.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={styles.infoLink}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
