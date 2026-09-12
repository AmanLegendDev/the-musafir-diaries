import type { Metadata } from "next";

import { InquiryPage } from "@/components/inquiry";

export const metadata: Metadata = {
  title: "Plan Your Journey | The Musafir Diaries",
  description:
    "Tell The Musafir Diaries about your Himalayan travel plans and start planning your journey.",
  alternates: {
    canonical: "/inquiry",
  },
  openGraph: {
    title: "Plan Your Journey | The Musafir Diaries",
    description:
      "Share your travel plans and start a conversation about your Himalayan journey.",
    type: "website",
    url: "/inquiry",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Journey | The Musafir Diaries",
    description:
      "Share your travel plans and start planning your Himalayan journey.",
  },
};

export default function InquiryRoutePage() {
  return <InquiryPage />;
}