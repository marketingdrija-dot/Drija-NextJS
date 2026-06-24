import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeItem(sectionSlug, groupSlug, name) {
  const slug = slugify(name);
  const id = `${sectionSlug}-${groupSlug}-${slug}`.slice(0, 80);

  return {
    id,
    slug,
    name,
    pdf: {
      src: `/manuals/${sectionSlug}/${groupSlug}/${slug}.pdf`,
      filename: `DRIJA-${slug}.pdf`,
    },
  };
}

function makeGroup(sectionSlug, name, items) {
  const groupSlug = slugify(name);

  return {
    id: `${sectionSlug}-${groupSlug}`,
    slug: groupSlug,
    name,
    order: 0,
    items: items.map((itemName) => makeItem(sectionSlug, groupSlug, itemName)),
  };
}

const catalog = [
  {
    id: "manuals-extractores",
    slug: "extractores",
    name: "Extractores",
    order: 1,
    translations: { en: { name: "Range Hoods" } },
    groups: [
      [
        "COMPACTAS",
        [
          "COMPATTO 60 - 76 - 90 ACERO / BLACK",
          "SLIM TOUCH 60 - 70 - 90 - ACERO / BLACK",
          "RETRACTIL TOUCH 60 - 76 - 90",
        ],
      ],
      [
        "ISLAS",
        [
          "PRISMA ISLA TOUCH 90 BLACK",
          "QUADRATO ISLA 76 ACERO / BLACK",
          "QUADRATO ISLA 90 BLACK",
          "QUADRATO ISLA 90 ACERO / BLACK",
          "ARCO ISLA 90",
          "PENDENTE 90-B",
        ],
      ],
      [
        "PARED",
        [
          "RECTÁGULO 76 BLACK",
          "RECTÁGULO 90 BLACK",
          "TRIANGOLO 60 - 76 - 90",
          "PIRÁMIDE 90 BLACK",
          "TRAPEZIO 90 BLACK",
          "PRISMA TOUCH 60",
          "PRISMA TOUCH 76",
          "PRISMA TOUCH 90",
          "GALAXY 76",
          "GALAXY 90",
          "QUADRATO 76 ACERO / BLACK",
          "QUADRATO 90 ACERO / BLACK",
        ],
      ],
    ],
  },
  {
    id: "manuals-estufas",
    slug: "estufas",
    name: "Estufas",
    order: 2,
    translations: { en: { name: "Ranges" } },
    groups: [
      [
        "TOPE GAS",
        [
          "POTENZA 76",
          "TURÍN 60",
          "MILÁN 30",
          "MILÁN 91",
          "MILÁN 60 PRO",
          "MILÁN 76 PRO",
          "TOSCANA 30",
          "TOSCANA 91",
          "TOSCANA 60 PRO",
          "TOSCANA 76 PRO",
          "FERRARA 60 PRO",
          "FERRARA 76 PRO",
          "FERRARA 90 PRO",
          "LAZIO 90",
          "ITALIA 76",
          "ITALIA 90",
        ],
      ],
      [
        "TOPE ELÉCTRICO",
        [
          "BARI 60",
          "BARI 76",
          "BARI 90",
          "BERLÍN 30",
          "BERLÍN 60",
          "BERLÍN 76",
          "BERLÍN 90",
        ],
      ],
      [
        "TOPE DUAL",
        [
          "SICILIA 30",
          "SICILIA 76",
          "SICILIA TOUCH 60",
          "SICILIA TOUCH 90",
        ],
      ],
      [
        "TOPE INDUCCIÓN",
          ["MÚNICH 60", "MÚNICH 76", "MÚNICH 90"],
      ],
      ["PISO", ["VENECIA 90"]],
    ],
  },
  {
    id: "manuals-neveras",
    slug: "neveras",
    name: "Neveras",
    order: 3,
    translations: { en: { name: "Refrigerators" } },
    groups: [
      [
        "EMPOTRABLES",
        [
          "GLASS-B 18FD4P",
          "GLASS-B 18CD4P",
          "DARK-I 18FD4P",
          "DARK-I 18CD4P",
        ],
      ],
      ["EJECUTIVAS", ["BLACK - 3", "MIRROR - 3"]],
      [
        "SIDE BY SIDE",
        [
          "SILVER",
          "INOX",
          "INOX - 18",
          "INOX - 23",
          "BLACK",
          "BLACK - 18",
          "BLACK - 20CFAH",
          "BLACK - 23",
          "MIRROR",
          "MIRROR - 18",
          "MIRROR - 20CFAH",
          "WHITE - 23",
        ],
      ],
      [
        "FRENCH DOOR",
        [
          "INOX - 18D3P",
          "INOX - 20D3P",
          "INOX - 18D4P",
          "BLACK - 18D4P",
          "MIRROR - 18D4P",
          "BLACK - 19D4P",
        ],
      ],
      ["TWIN", ["TWIN 36D4PD / 36D4PIFH"]],
    ],
  },
];

const sections = catalog.map((section) => ({
  id: section.id,
  slug: section.slug,
  name: section.name,
  order: section.order,
  translations: section.translations,
  groups: section.groups.map(([groupName, items], index) => ({
    ...makeGroup(section.slug, groupName, items),
    order: index + 1,
  })),
}));

const output = {
  hero: {
    es: {
      src: "/images/manuals/hero.jpg",
      alt: "Manuales de productos DRIJA",
    },
    en: {
      src: "/images/manuals/hero.jpg",
      alt: "DRIJA product manuals",
    },
  },
  sections,
};

const outPath = path.join(root, "data/product-manuals.json");
fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);

const pdfPaths = [];
for (const section of sections) {
  for (const group of section.groups) {
    for (const item of group.items) {
      pdfPaths.push(path.join(root, "public", item.pdf.src));
    }
  }
}

for (const pdfPath of pdfPaths) {
  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  if (!fs.existsSync(pdfPath)) {
    fs.writeFileSync(pdfPath, "");
  }
}

console.log(`Wrote ${outPath} with ${pdfPaths.length} manual entries.`);
