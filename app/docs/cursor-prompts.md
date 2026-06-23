Act as a Senior Frontend Architect and Sanity CMS expert.

I am building a React / Next.js product catalog website that will use Sanity as the CMS.

I need to implement a country/region selector that controls which products and categories are visible.

Countries/regions:

- Caribbean
- Costa Rica
- El Salvador
- Guatemala
- Honduras
- Nicaragua
- Panamá
- República Dominicana
- Venezuela
- México

Important note:
“Caribbean” is not a country. Please model it as a region, not as a country.

Requirements:

1. Add a country/region selector dropdown in the header.
2. Use Panamá as the default selected country/region.
3. Store the selected country/region in localStorage so it persists after page refresh.
4. Load the previously selected country/region on startup.
5. Use a global state solution, preferably Zustand, to access the selected country/region from any component.
6. Products should not be duplicated per country.
7. Each product should have an `availableMarkets` field or similar that references the countries/regions where it is available.
8. Categories should also support market availability.
9. Categories without visible products should automatically be hidden.
10. The architecture must be Sanity-friendly and scalable.
11. Avoid creating separate JSON files per country.
12. The solution should work now with static/local data and later with Sanity data.

Please propose and implement:

- Folder structure.
- TypeScript interfaces.
- Sanity schemas for:
  - Market
  - Product
  - Category
- Example static data for the markets using codes:
  - CAR: Caribbean
  - CR: Costa Rica
  - SV: El Salvador
  - GT: Guatemala
  - HN: Honduras
  - NI: Nicaragua
  - PA: Panamá
  - DO: República Dominicana
  - VE: Venezuela
  - MX: México
- Zustand store for selected market.
- localStorage persistence.
- Header dropdown component.
- Product filtering logic.
- Category filtering logic.
- Example usage in a product listing page.
- A migration-friendly structure so the same logic works when data comes from Sanity.

Recommended model:

Market:
- name
- code
- type: "country" | "region"
- isDefault

Product:
- title
- slug
- category
- availableMarkets[]

Category:
- title
- slug
- availableMarkets[]

Filtering rules:

- A product is visible only if the selected market exists in `product.availableMarkets`.
- A category is visible only if:
  a) the category is available in the selected market, and
  b) it has at least one visible product.
- If a product or category has `availableMarkets: ["ALL"]`, it should be visible in all markets.

Please include clean, production-ready code examples using TypeScript.