import { NextRequest, NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { parseLocaleParam } from "@/lib/i18n/parse-locale";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categorySlug = searchParams.get("category") ?? undefined;
  const featured = searchParams.get("featured") === "true";
  const countryCode = searchParams.get("country") ?? undefined;
  const marketCode = searchParams.get("market") ?? undefined;
  const locale = parseLocaleParam(searchParams.get("locale"));

  const products = await getCms().getProducts({
    categorySlug,
    featured,
    countryCode,
    marketCode: marketCode as import("@/types/market").MarketCode | undefined,
    locale,
  });

  return NextResponse.json({ data: products });
}
