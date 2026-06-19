"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation/Navigation";
import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { MarketSelector } from "@/components/navigation/MarketSelector";
import { MarketBar } from "@/components/navigation/MarketBar";
import {
  CategoriesMegaMenuPanel,
  CategoriesMenuRoot,
  CategoriesMobileAccordion,
} from "@/components/navigation/CategoriesMegaMenu";
import {
  GlobalSearchPanel,
  GlobalSearchRoot,
  GlobalSearchTrigger,
} from "@/components/search/GlobalSearch";
import { useI18n } from "@/lib/i18n/context";
import { isActivePath } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

import styles from './Header.module.css';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dict, href } = useI18n();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mobileLinks = [
    { href: href("/"), label: dict.nav.home },
    { href: href("/blog"), label: dict.nav.blog },
    { href: href("/donde-comprar"), label: dict.nav.whereToBuy },
    { href: href("/soporte"), label: dict.nav.support },
    { href: href("/contacto"), label: dict.nav.contact },
  ];

  return (
    <CategoriesMenuRoot>
      <GlobalSearchRoot>
        <header
        className={cn(
          styles.hero,
          scrolled && styles.heroScrolled,
          "border-b border-transparent",
        )}
      >
        <MarketBar />

        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8",
            styles.navRow,
          )}
        >
          <Link href={href("/")} className="shrink-0" aria-label={dict.common.homeLabel}>
            <Image
              src="/logo.svg"
              alt="DRIJA"
              width={151}
              height={38}
              priority
              className="h-9 w-auto"
              style={{ width: "auto" }}
            />
          </Link>

          <div className={styles.navCluster}>
            <Navigation />
            <div className={styles.headerTools}>
              <GlobalSearchTrigger />
              <MarketSelector />
              <LocaleSwitcher />
            </div>
          </div>

          <button
            type="button"
            className={`${styles["navigation-menu-items"]} inline-flex items-center justify-center rounded-md border border-neutral-300 p-2 lg:hidden`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{dict.common.openMenu}</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <GlobalSearchPanel />
        <CategoriesMegaMenuPanel />

        <div
          id="mobile-menu"
          className={cn(
            "border-t border-neutral-200 bg-white lg:hidden",
            open ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col px-4 py-3">
            <CategoriesMobileAccordion onNavigate={() => setOpen(false)} />
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-2 text-sm font-semibold uppercase",
                    isActivePath(pathname, link.href)
                      ? "text-drija-green"
                      : "text-neutral-700",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      </GlobalSearchRoot>
    </CategoriesMenuRoot>
  );
}
