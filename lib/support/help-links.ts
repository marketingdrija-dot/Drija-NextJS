import type { Dictionary } from "@/lib/i18n/types";
import type { SupportHelpItem } from "@/components/support/SupportHelpSection";

const SUPPORT_ICONS = {
  manuals: "/images/support/Icono_Manuales_DRIJA.png",
  technicalService: "/images/support/Icono_Servicio_Tecnico_DRIJA.png",
  catalogs: "/images/support/Icono_Catalogo_DRIJA.png",
  warranties: "/images/support/Icono_Garantias_DRIJA.png",
} as const;

export function buildSupportHelpItems(
  dict: Dictionary,
  href: (path: string) => string,
): SupportHelpItem[] {
  return [
    {
      label: dict.support.manuals,
      href: href("/soporte"),
      iconSrc: SUPPORT_ICONS.manuals,
      iconAlt: dict.support.manuals,
    },
    {
      label: dict.support.technicalService,
      href: href("/donde-comprar"),
      iconSrc: SUPPORT_ICONS.technicalService,
      iconAlt: dict.support.technicalService,
    },
    {
      label: dict.support.catalogs,
      href: href("/productos"),
      iconSrc: SUPPORT_ICONS.catalogs,
      iconAlt: dict.support.catalogs,
    },
    {
      label: dict.support.warranties,
      href: href("/soporte"),
      iconSrc: SUPPORT_ICONS.warranties,
      iconAlt: dict.support.warranties,
    },
  ];
}
