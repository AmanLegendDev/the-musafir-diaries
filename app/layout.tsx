import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

import FloatingWhatsApp from "@/components/common/whatsapp/FloatingWhatsApp";
import PublicChrome from "@/components/layout/PublicChrome";
import { Toaster } from "sonner";

/* =========================================================
   SINGLE FONT — GEIST
========================================================= */

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com"
).replace(/\/+$/, "");

const SITE_NAME = "The Musafir Diaries";

const DEFAULT_DESCRIPTION =
  "The Musafir Diaries crafts thoughtful Himalayan journeys, curated stays, destination experiences and unforgettable travel stories from Shimla, Himachal Pradesh.";

const DEFAULT_OG_IMAGE = "/og-image.jpg";

/* =========================================================
   GLOBAL METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: DEFAULT_DESCRIPTION,

  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
      url: SITE_URL,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  verification: {
    google: "wRL3z2csSXERQi0OwmBcgNh7np6lUkhBoH3qPj4_i6g",
  },

  keywords: [
    "The Musafir Diaries",
    "Himachal Pradesh travel",
    "Himalayan travel",
    "Shimla travel",
    "Manali travel",
    "Spiti Valley travel",
    "Himachal travel packages",
    "Himalayan travel experiences",
  ],

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-48.png",
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: "/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Musafir Diaries — Himalayan Travel Experiences",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Thoughtful Himalayan journeys, curated stays and unforgettable travel experiences from The Musafir Diaries.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Musafir Diaries — Himalayan Travel Experiences",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#071A33",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} font-sans`}
    >
      <body className="min-h-screen bg-[#FAF9F5] text-[#071A33] antialiased">
        <PublicChrome>{children}</PublicChrome>

        <FloatingWhatsApp />

        <Toaster
          richColors
          position="top-right"
          closeButton
        />
      </body>
    </html>
  );
}