import { Fraunces, JetBrains_Mono, Outfit, Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";
import { Author29Bar } from "@/components/Author29Bar";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const display = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const a29Display = Fraunces({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-a29-display",
});

const a29Mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-a29-mono",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3020");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Queue — Author29 trial",
  description:
    "Interactive trial: who needs a touch today. Draft outreach, human review, simulated send. Fictional sample. Nothing sends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${a29Display.variable} ${a29Mono.variable}`}
    >
      <body>
        <Author29Bar />
        {children}
      </body>
    </html>
  );
}
