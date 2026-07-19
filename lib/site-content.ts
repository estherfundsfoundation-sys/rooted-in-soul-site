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
  bookingRules: [
    "Deposits — A $20 nonrefundable deposit is required for every service. Braid appointments require a $30 nonrefundable deposit. If the stylist must cancel your appointment, your deposit will be refunded.",
    "Final payment — Cash is preferred for the remaining balance, but other forms of payment are accepted.",
    "Late arrivals — A $15 late fee is added after the 10-minute grace period. After 20 minutes without communication, the appointment will be cancelled and the deposit forfeited.",
    "Hair preparation — Please arrive with clean, washed hair for every service. Blow-dried hair is preferred for braid appointments but is not required.",
    "Hair — Braiding hair is included with braid services, but boho extensions and other added pieces are not. For all other styles, clients must purchase their own hair unless discussed with the stylist in advance. Text Shawnie if you need help choosing hair.",
    "Communication — If you are running late or an emergency comes up, please communicate. Shawnie understands that unexpected situations happen.",
    "Guests — No extra guests are allowed at appointments.",
    "Same-day and squeeze-in appointments — Please text Shawnie before booking. VIP and squeeze-in appointments include a $50 fee.",
    "Service concerns — Please communicate any dissatisfaction during your appointment so it can be addressed at that time. Refunds are not offered.",
    "Photos — Photos may be taken during your appointment.",
    "Confirmation — After booking, you will receive a confirmation email with the appointment time, location, and any additional requests. By booking and paying the deposit, you confirm that you have read and agreed to these policies.",
  ],
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
