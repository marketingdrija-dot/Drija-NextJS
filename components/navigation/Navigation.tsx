"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CategoriesMenuTrigger } from "@/components/navigation/CategoriesMegaMenu";
import { useI18n } from "@/lib/i18n/context";
import { isActivePath, stripLocalePrefix } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";
import styles from "./Navigation.module.css";

function isNavItemActive(pathname: string, href: string): boolean {
  if (isActivePath(pathname, href)) return true;

  const path = stripLocalePrefix(pathname);
  const target = stripLocalePrefix(href);

  if (target === "/blog") {
    return path.startsWith("/blog/");
  }

  return false;
}

export function Navigation() {
  const pathname = usePathname();
  const { dict, href } = useI18n();

  const links = [
    { href: href("/blog"), label: dict.nav.blog },
    { href: href("/donde-comprar"), label: dict.nav.whereToBuy },
    { href: href("/soporte"), label: dict.nav.support },
    { href: href("/contacto"), label: dict.nav.contact },
  ];

  return (
    <nav aria-label="Principal" className="hidden items-center lg:flex">
      <ul className={styles.navList}>
        <li>
          <CategoriesMenuTrigger />
        </li>
        {links.map((link) => {
          const active = isNavItemActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  styles.navLink,
                  active && styles.navLinkActive,
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
