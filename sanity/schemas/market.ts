/**
 * Sanity Studio schema — Market (country or region).
 * Copy into your Sanity project: schemas/market.ts
 *
 * @example
 * import market from './market'
 * export const schemaTypes = [market, ...]
 */
export const marketSchema = {
  name: "market",
  title: "Market",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "code",
      title: "Code",
      type: "string",
      description: "CAR, CR, SV, GT, HN, NI, PA, DO, VE, MX",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Country", value: "country" },
          { title: "Region", value: "region" },
        ],
        layout: "radio",
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "isDefault",
      title: "Default market",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "order",
      title: "Sort order",
      type: "number",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "code" },
  },
} as const;

export default marketSchema;
