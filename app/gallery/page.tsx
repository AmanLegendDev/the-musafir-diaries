import { Metadata } from "next";

import connectDB from "@/lib/db";
import Gallery from "@/models/gallery.model";

import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Travel Gallery | Altitude Escapes",
  description:
    "Explore breathtaking Himalayan landscapes, luxury stays, unforgettable adventures and travel memories through the Altitude Escapes gallery.",
  keywords: [
    "Travel Gallery",
    "Himachal Gallery",
    "Luxury Travel",
    "Adventure",
    "Altitude Escapes",
  ],
  openGraph: {
    title: "Travel Gallery | Altitude Escapes",
    description:
      "Explore breathtaking Himalayan landscapes and unforgettable travel moments.",
    images: ["/images/og-gallery.jpg"],
    type: "website",
  },
};

export default async function GalleryPage() {
  await connectDB();

  const images = await Gallery.find({
    active: true,
  })
    .sort({
      featured: -1,
      order: 1,
      createdAt: -1,
    })
    .lean();

  const gallery = JSON.parse(JSON.stringify(images));

  return <GalleryClient images={gallery} />;
}