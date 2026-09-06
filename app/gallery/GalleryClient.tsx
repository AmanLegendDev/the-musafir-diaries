"use client";

import { useMemo, useState } from "react";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryStats from "@/components/gallery/GalleryStats";
import FeaturedGallery from "@/components/gallery/FeaturedGallery";
import GalleryCategories from "@/components/gallery/GalleryCategories";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import Lightbox from "@/components/gallery/Lightbox";
import CTASection from "@/components/gallery/CTASection";
import { Footer } from "@/components/footer";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  alt?: string;
  featured?: boolean;
  order?: number;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({
  images,
}: GalleryClientProps) {
  const [activeCategory, setActiveCategory] =
    useState("all");

  const [lightboxOpen, setLightboxOpen] =
    useState(false);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") {
      return images;
    }

    return images.filter(
      (image) => image.category === activeCategory
    );
  }, [images, activeCategory]);

  const featuredImages = useMemo(() => {
    const featured = filteredImages.filter(
      (image) => image.featured
    );

    if (featured.length >= 5) {
      return featured.slice(0, 5);
    }

    return filteredImages.slice(0, 5);
  }, [filteredImages]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedIndex((prev) =>
      prev === 0
        ? filteredImages.length - 1
        : prev - 1
    );
  };

  return (
    <>
      <GalleryHero />

      <GalleryStats />

      <FeaturedGallery
        images={featuredImages}
        onImageClick={openLightbox}
      />

      <GalleryCategories
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <MasonryGrid
        images={filteredImages}
        onImageClick={openLightbox}
      />

            <Lightbox
        images={filteredImages}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      <CTASection />
      <Footer/>
    </>
  );
}