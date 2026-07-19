import { list, put } from "@vercel/blob";

export type ServiceItem = { title: string; description: string; price: string };
export type SiteContent = {
  announcement: string;
  squareBookingUrl: string;
  bookingRules: string[];
  services: ServiceItem[];
};

export const defaultSiteContent: SiteContent = {
  announcement: "",
  squareBookingUrl: "",
  bookingRules: ["Please arrive on time and ready for your scheduled service.", "Final policies, deposits, and cancellation details will appear here once Shawnie adds them."],
  services: [
    { title: "Loc Care", description: "Intentional care for every stage of your loc journey—from maintenance to styling.", price: "" },
    { title: "Natural Hair", description: "Healthy-hair rituals that honor your texture, protect your crown, and keep you feeling like you.", price: "" },
    { title: "Signature Styles", description: "Polished, expressive looks created around your lifestyle, your energy, and your next moment.", price: "" },
  ],
};

export async function getSiteContent(): Promise<SiteContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaultSiteContent;
  try {
    const { blobs } = await list({ prefix: "rooted-content/site.json", limit: 1 });
    if (!blobs[0]) return defaultSiteContent;
    const response = await fetch(blobs[0].url, { cache: "no-store" });
    if (!response.ok) return defaultSiteContent;
    return { ...defaultSiteContent, ...(await response.json()) };
  } catch {
    return defaultSiteContent;
  }
}

export async function saveSiteContent(content: SiteContent) {
  return put("rooted-content/site.json", JSON.stringify(content), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
