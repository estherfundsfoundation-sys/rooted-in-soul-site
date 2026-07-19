import { createHash, timingSafeEqual } from "node:crypto";

export const STUDIO_COOKIE = "rooted_studio";

export function studioToken(password: string) {
  return createHash("sha256").update(`rooted-in-soul:${password}`).digest("hex");
}

export function isStudioTokenValid(value?: string) {
  const password = process.env.GALLERY_ADMIN_PASSWORD;
  if (!password || !value) return false;
  const expected = studioToken(password);
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
