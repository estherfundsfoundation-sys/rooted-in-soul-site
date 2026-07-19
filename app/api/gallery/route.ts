import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ photos: [] });
  const { blobs } = await list({ prefix: "rooted-gallery/", limit: 100 });
  const photos = blobs
    .filter((blob) => /\.(avif|gif|heic|heif|jpe?g|png|webp)$/i.test(blob.pathname))
    .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
    .map((blob) => ({ url: blob.url, pathname: blob.pathname, uploadedAt: blob.uploadedAt }));
  return NextResponse.json({ photos }, { headers: { "Cache-Control": "no-store" } });
}
