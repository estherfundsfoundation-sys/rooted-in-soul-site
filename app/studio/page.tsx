import { cookies } from "next/headers";
import Image from "next/image";
import StudioClient from "./studio-client";
import { isStudioTokenValid, STUDIO_COOKIE } from "@/lib/studio-auth";

export const metadata = { title: "Stylist Studio | Rooted In Soul" };

export default async function StudioPage() {
  const cookieStore = await cookies();
  const signedIn = isStudioTokenValid(cookieStore.get(STUDIO_COOKIE)?.value);
  return <main className="studio-page"><div className="studio-brand"><span className="studio-brand-logo"><Image src="/images/rooted-in-soul-mark.jpg" alt="" width={44} height={44} priority /></span><div><strong>Rooted In Soul</strong><small>PRIVATE STYLIST STUDIO</small></div></div><StudioClient signedIn={signedIn} /></main>;
}
import { cookies } from "next/headers";
import StudioClient from "./studio-client";
import { isStudioTokenValid, STUDIO_COOKIE } from "@/lib/studio-auth";

export const metadata = { title: "Stylist Studio | Rooted In Soul" };

export default async function StudioPage() {
  const cookieStore = await cookies();
  const signedIn = isStudioTokenValid(cookieStore.get(STUDIO_COOKIE)?.value);
  return <main className="studio-page"><div className="studio-brand"><span>R</span><div><strong>Rooted In Soul</strong><small>PRIVATE STYLIST STUDIO</small></div></div><StudioClient signedIn={signedIn} /></main>;
}
