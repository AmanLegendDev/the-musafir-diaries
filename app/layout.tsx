import type { Metadata } from "next";
import { Inter, Poppins, Geist } from "next/font/google";
import "./globals.css";
import Navbaar from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

export const metadata: Metadata = {
  metadataBase: new URL("https://altitude-escapes.vercel.app"),

  title: {
    default: "Altitude Escapes",
    template: "%s | Altitude Escapes",
  },

  description:
    "Premium travel experiences, luxury destinations, curated adventures and unforgettable journeys. Every Journey Begins With Trust.",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Altitude Escapes",
    description:
      "Premium travel experiences, luxury destinations, curated adventures and unforgettable journeys.",

    url: "https://altitude-escapes.vercel.app",

    siteName: "Altitude Escapes",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Altitude Escapes",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Altitude Escapes",
    description:
      "Premium travel experiences, luxury destinations and unforgettable Himalayan journeys.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
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
      className={cn(inter.variable, poppins.variable, "font-sans", geist.variable)}
    >
    
      <body>
        <Navbaar/>
        {children}   <Toaster richColors /> </body>
    </html>
  );
}