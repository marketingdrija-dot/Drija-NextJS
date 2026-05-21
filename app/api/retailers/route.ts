import { NextRequest, NextResponse } from "next/server";
import { getCms } from "@/lib/cms";
import { parseLocaleParam } from "@/lib/i18n/parse-locale";

export async function GET(request: NextRequest) {
  const locale = parseLocaleParam(request.nextUrl.searchParams.get("locale"));
  const retailers = await getCms().getRetailers(locale);
  return NextResponse.json({ data: retailers });
}
