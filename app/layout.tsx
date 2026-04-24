import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://sjmvne.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simone Pepe — Developer & Digital Builder",
    template: "%s — Simone Pepe",
  },
  description:
    "Senior Developer in Accenture, MES/ERP, SAPUI5 e DELMIA Apriso. Fondatore di WebHub. Costruisco software enterprise e tool AI-powered.",
  keywords: [
    "Simone Pepe",
    "Developer",
    "SAPUI5",
    "DELMIA Apriso",
    "MES",
    "ERP",
    "Accenture",
    "WebHub",
    "Milano",
  ],
  authors: [{ name: "Simone Pepe" }],
  creator: "Simone Pepe",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "sjmvne.dev",
    title: "Simone Pepe — Developer & Digital Builder",
    description:
      "Senior Developer in Accenture, MES/ERP, SAPUI5 e DELMIA Apriso. Fondatore di WebHub.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simone Pepe — Developer & Digital Builder",
    description:
      "Senior Developer in Accenture, MES/ERP. Fondatore di WebHub. Tool AI-powered.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Simone Pepe",
  url: SITE_URL,
  jobTitle: "Senior Developer",
  worksFor: { "@type": "Organization", name: "Accenture" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Milano",
    addressCountry: "IT",
  },
  sameAs: [
    "https://linkedin.com/in/simonepepe00",
    "https://instagram.com/sjmvne",
    "https://webhub.agency",
  ],
  knowsAbout: [
    "SAPUI5",
    "DELMIA Apriso",
    "SAP MII",
    "MES",
    "ERP",
    "Next.js",
    "Anthropic API",
    "Model Context Protocol",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
