import Image from "next/image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.themusafirdiaries.com";
  import NavBaar from "@/components/layout/Navbar";
  import Hero from "@/components/home/Hero/Hero";
  import Story from "@/components/home/story/StorySection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Musafir Diaries | Coming Soon",
  description:
    "The Musafir Diaries is crafting a beautiful new travel experience from Shimla, Himachal Pradesh.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "The Musafir Diaries | Coming Soon",
    description:
      "A new travel experience is being crafted. The Musafir Diaries — Explore • Experience • Memories.",
    url: SITE_URL,
    siteName: "The Musafir Diaries",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <NavBaar />
      <Hero/>
      <Story />
    
    </>
  );
}