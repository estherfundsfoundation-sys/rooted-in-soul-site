import { NextResponse } from "next/server";
import { STUDIO_COOKIE, studioToken } from "@/lib/studio-auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.GALLERY_ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "That studio password is not correct." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(STUDIO_COOKIE, studioToken(expected), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
