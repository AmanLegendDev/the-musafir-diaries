"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DestinationGalleryProps {
  heroImage: string;
  gallery: string[];
  destinationName: string;
}

export default function DestinationGallery({
  heroImage,
  gallery,
  destinationName,
}: DestinationGalleryProps) {
  const images = useMemo(() => {
    const allImages = [heroImage, ...gallery].filter(Boolean);

    return [...new Set(allImages)];
  }, [heroImage, gallery]);

  const [selectedImage, setSelectedImage] = useState(
    images[0] || ""
  );

  if (images.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-center">
            <Camera className="mb-4 h-12 w-12 text-slate-400" />

            <h3 className="text-xl font-semibold text-slate-800">
              No Photos Available
            </h3>

            <p className="mt-2 max-w-md text-slate-500">
              Images for this destination will be added
              soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Heading */}

        <div className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            <Camera className="h-4 w-4" />
            Gallery
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Explore {destinationName}
          </h2>

          <p className="mt-3 max-w-2xl text-slate-600">
            Experience the beauty of this destination
            through carefully selected photographs.
          </p>
        </div>

        {/* Layout */}

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* Featured Image */}

          <motion.div
            layout
            className="relative overflow-hidden rounded-3xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImage}
                initial={{
                  opacity: 0,
                  scale: 1.03,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="relative aspect-[16/10] w-full"
              >
                <Image
                  src={selectedImage}
                  alt={destinationName}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 70vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />
              </motion.div>
            </AnimatePresence>

            {/* Image Count */}

            <div
              className="
                absolute
                bottom-4
                right-4
                rounded-full
                bg-black/60
                px-4
                py-2
                text-sm
                font-medium
                text-white
                backdrop-blur-md
              "
            >
              {images.length} Photos
            </div>
          </motion.div>

          {/* Desktop Thumbnails */}

          <div className="hidden grid-cols-2 gap-4 lg:grid">

                        {images.slice(0, 4).map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`
                  group
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  border-2
                  transition-all
                  duration-300

                  ${
                    selectedImage === image
                      ? "border-emerald-500 ring-2 ring-emerald-200"
                      : "border-transparent hover:border-emerald-300"
                  }
                `}
              >
                <Image
                  src={image}
                  alt={`${destinationName} ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="250px"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/10
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                />

                {selectedImage === image && (
                  <div
                    className="
                      absolute
                      inset-0
                      border-4
                      border-emerald-500
                      rounded-2xl
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Thumbnails */}

        <div className="mt-6 lg:hidden">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`
                  relative
                  h-24
                  w-32
                  flex-shrink-0
                  overflow-hidden
                  rounded-xl
                  border-2
                  transition-all

                  ${
                    selectedImage === image
                      ? "border-emerald-500"
                      : "border-transparent"
                  }
                `}
              >
                <Image
                  src={image}
                  alt={`${destinationName} ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="140px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}