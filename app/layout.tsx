import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rooted In Soul | Where Hair Is Heritage",
  description: "Intentional loc, natural hair, and signature styling in Tallahassee, Florida.",
  icons: { icon: "/images/rooted-in-soul-mark.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
