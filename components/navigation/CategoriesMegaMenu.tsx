"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useCategoriesMenu } from "@/hooks/useCategoriesMenu";
import { useI18n } from "@/lib/i18n/context";
import { stripLocalePrefix } from "@/lib/i18n/paths";
import { cn } from "@/lib/utils";

import navStyles from "./Navigation.module.css";

const megaMenuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

type CategoriesMenuContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const CategoriesMenuContext = createContext<CategoriesMenuContextValue | null>(
  null,
);

function useCategoriesMenuContext() {
  const context = useContext(CategoriesMenuContext);
  if (!context) {
    throw new Error(
      "Categories menu components must be used within CategoriesMenuRoot",
    );
  }
  return context;
}

function isCategoriesSectionActive(pathname: string): boolean {
  const path = stripLocalePrefix(pathname);
  return (
    path === "/productos" ||
    path === "/categorias" ||
    path.startsWith("/categories")
  );
}

function NavChevron({
  open,
  placement = "inline",
}: {
  open: boolean;
  placement?: "inline" | "below";
}) {
  if (placement === "below") {
    return (
      <span
        className={cn(
          "inline-block h-2 w-2 border-r-2 border-b-2 border-drija-green transition-transform duration-200",
          open ? "-translate-y-px rotate-[-135deg]" : "translate-y-px rotate-45",
        )}
        aria-hidden
      />
    );
  }

  return (
    <span
      className={cn(
        "ml-1.5 inline-block h-2 w-2 border-r-2 border-b-2 border-current transition-transform duration-200",
        open ? "-translate-y-px rotate-[-135deg]" : "translate-y-px rotate-45",
      )}
      aria-hidden
    />
  );
}

export function CategoriesMenuRoot({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <CategoriesMenuContext.Provider
      value={{ open, toggle, close, triggerRef }}
    >
      {children}
    </CategoriesMenuContext.Provider>
  );
}

export function CategoriesMenuTrigger() {
  const pathname = usePathname();
  const { dict } = useI18n();
  const { open, toggle, triggerRef } = useCategoriesMenuContext();
  const routeActive = isCategoriesSectionActive(pathname);

  return (
    <button
      ref={triggerRef}
      type="button"
      className={navStyles.navCategoriesTrigger}
      aria-expanded={open}
      aria-haspopup="true"
      aria-label={dict.nav.products}
      onClick={toggle}
    >
      <span
        className={cn(
          navStyles.navLink,
          (open || routeActive) && navStyles.navLinkActive,
        )}
      >
        {dict.nav.products}
      </span>
      {open ? (
        <span
          className={cn(
            navStyles.navCategoriesChevron,
            navStyles.navCategoriesChevronOpen,
          )}
          aria-hidden
        />
      ) : null}
    </button>
  );
}

function MegaMenuContent({ onNavigate }: { onNavigate: () => void }) {
  const { columns, viewAllHref, viewAllLabel } = useCategoriesMenu();

  return (
    <div className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)] lg:p-10">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
        {columns.map((column) => (
          <div key={column.slug}>
            <Link
              href={column.href}
              onClick={onNavigate}
              className="text-sm font-bold uppercase tracking-wide text-neutral-900 transition-colors hover:text-drija-green"
            >
              {column.name}
            </Link>
            {column.subcategories.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {column.subcategories.map((subcategory) => (
                  <li key={subcategory.slug}>
                    <Link
                      href={subcategory.href}
                      onClick={onNavigate}
                      className="text-sm text-neutral-600 transition-colors hover:text-drija-green"
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <Link
          href={viewAllHref}
          onClick={onNavigate}
          className="inline-flex text-sm font-bold uppercase tracking-wide text-drija-green transition hover:underline"
        >
          {viewAllLabel}
        </Link>
      </div>
    </div>
  );
}

export function CategoriesMegaMenuPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { open, close, triggerRef } = useCategoriesMenuContext();

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      handleClose();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose, open, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          className="pointer-events-none absolute left-0 top-full z-[65] hidden w-full px-4 pt-3 sm:px-6 lg:block lg:px-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={megaMenuVariants}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="pointer-events-auto mx-auto max-w-[1200px]">
            <MegaMenuContent onNavigate={handleClose} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function CategoriesMobileAccordion({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const { open, toggle, close } = useCategoriesMenuContext();
  const { columns, viewAllHref, viewAllLabel } = useCategoriesMenu();
  const routeActive = isCategoriesSectionActive(pathname);

  const handleNavigate = () => {
    close();
    onNavigate?.();
  };

  return (
    <li className="border-b border-neutral-100 last:border-b-0">
      <button
        type="button"
        className={cn(
          "flex w-full items-center justify-between py-3 text-sm font-semibold uppercase",
          open || routeActive ? "text-drija-green" : "text-neutral-700",
        )}
        aria-expanded={open}
        onClick={toggle}
      >
        <span>{dict.nav.products}</span>
        <NavChevron open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-4 pl-1">
              {columns.map((column) => (
                <div key={column.slug}>
                  <Link
                    href={column.href}
                    onClick={handleNavigate}
                    className="block py-1 text-sm font-bold uppercase tracking-wide text-neutral-900"
                  >
                    {column.name}
                  </Link>
                  {column.subcategories.length > 0 ? (
                    <ul className="mt-1 space-y-1 pl-3">
                      {column.subcategories.map((subcategory) => (
                        <li key={subcategory.slug}>
                          <Link
                            href={subcategory.href}
                            onClick={handleNavigate}
                            className="block py-1 text-sm text-neutral-600"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}

              <Link
                href={viewAllHref}
                onClick={handleNavigate}
                className="inline-flex pt-2 text-sm font-bold uppercase tracking-wide text-drija-green"
              >
                {viewAllLabel}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
