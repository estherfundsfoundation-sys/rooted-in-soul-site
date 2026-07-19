import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isStudioTokenValid, STUDIO_COOKIE } from "@/lib/studio-auth";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getSiteContent(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const cookieStore = await cookies();
  if (!isStudioTokenValid(cookieStore.get(STUDIO_COOKIE)?.value)) return NextResponse.json({ error: "Studio sign-in required." }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "Photo storage is not connected yet." }, { status: 503 });
  const content = (await request.json()) as SiteContent;
  const cleaned: SiteContent = {
    announcement: String(content.announcement ?? "").slice(0, 240),
    squareBookingUrl: String(content.squareBookingUrl ?? "").slice(0, 500),
    bookingRules: (content.bookingRules ?? []).map((rule) => String(rule).trim()).filter(Boolean).slice(0, 20),
    services: (content.services ?? []).map((service) => ({ title: String(service.title ?? "").trim().slice(0, 80), description: String(service.description ?? "").trim().slice(0, 500), price: String(service.price ?? "").trim().slice(0, 80) })).filter((service) => service.title).slice(0, 30),
  };
  await saveSiteContent(cleaned);
  return NextResponse.json({ ok: true, content: cleaned });
}
