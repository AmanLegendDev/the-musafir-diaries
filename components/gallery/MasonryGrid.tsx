"use client";

import { motion } from "framer-motion";
import GalleryCard from "./GalleryCard";

interface GalleryImage {
  _id: string;
  title: string;
  image: string;
  category: string;
  alt?: string;
}

interface MasonryGridProps {
  images: GalleryImage[];
  onImageClick?: (index: number) => void;
}

export default function MasonryGrid({
  images,
  onImageClick,
}: MasonryGridProps) {
  if (!images.length) {
    return (
      <section id="gallery" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-slate-900">
            No Images Found
          </h3>

          <p className="mt-4 text-slate-600">
            Gallery images will appear here once they are added.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mb-14 text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Photo Collection
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Every Journey
            <span className="text-emerald-600"> Captured</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Explore unforgettable moments from mountains, luxury stays,
            adventures, culture and breathtaking Himalayan landscapes.
          </p>

        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
        >
          {images.map((image, index) => (
            <motion.div
              key={image._id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              className="mb-6 break-inside-avoid"
            >
              <GalleryCard
                image={image}
                index={index}
                onClick={onImageClick}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}