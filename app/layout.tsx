import type { Metadata } from "next";
import { Geist, Inter, Poppins } from "next/font/google";

import "./globals.css";

import PublicChrome from "@/components/layout/PublicChrome";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "The Musafir Diaries",
    template: "%s | The Musafir Diaries",
  },

  description:
    "The Musafir Diaries crafts thoughtful Himalayan journeys, curated stays, destination experiences and unforgettable travel stories from Himachal Pradesh.",

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

  applicationName: "The Musafir Diaries",

  authors: [
    {
      name: "The Musafir Diaries",
    },
  ],

  creator: "The Musafir Diaries",
  publisher: "The Musafir Diaries",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "The Musafir Diaries",
    description:
      "Thoughtful Himalayan journeys, curated stays and experiences designed to become part of your story.",

    url: SITE_URL,
    siteName: "The Musafir Diaries",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Musafir Diaries",
      },
    ],

    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "The Musafir Diaries",

    description:
      "Thoughtful Himalayan journeys, curated stays and unforgettable travel experiences.",

    images: ["/og-image.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        poppins.variable,
        geist.variable,
        "font-sans",
      )}
    >
<body className="min-h-screen bg-[#FAF9F5] text-[#071A33] antialiased">
  <PublicChrome>
    {children}
  </PublicChrome>

  <Toaster
    richColors
    position="top-right"
    closeButton
  />
</body>
    </html>
  );
}