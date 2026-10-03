import type { Metadata } from "next";

import { BookingPage } from "@/components/booking";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

export const metadata: Metadata = {
  title: "Plan Your Journey | Book Your Himalayan Trip",

  description:
    "Plan your Himalayan journey with The Musafir Diaries. Share your travel dates, destination, group details and preferences to start planning a personalised trip.",

  keywords: [
    "Himalayan trip booking",
    "Himachal Pradesh trip booking",
    "Himachal travel booking",
    "Himalayan holiday packages",
    "customised Himachal trips",
    "customised Himalayan travel",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: `${SITE_URL}/booking`,
  },

  openGraph: {
    title:
      "Plan Your Journey | The Musafir Diaries",

    description:
      "Tell us about your travel plans and start creating a personalised Himalayan journey with The Musafir Diaries.",

    url: `${SITE_URL}/booking`,

    siteName: SITE_NAME,

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt:
          "Plan your Himalayan journey with The Musafir Diaries",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Plan Your Journey | The Musafir Diaries",

    description:
      "Start planning a personalised Himalayan journey with The Musafir Diaries.",

    images: [
      `${SITE_URL}/og-image.jpg`,
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

export default function Page() {
  return <BookingPage />;
}