"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

interface GalleryImage {
  _id: string;
  title: string;
  image: string;
  category: string;
}

interface FeaturedGalleryProps {
  images: GalleryImage[];
  onImageClick?: (index: number) => void;
}

export default function FeaturedGallery({
  images,
  onImageClick,
}: FeaturedGalleryProps) {
  if (images.length === 0) return null;

  const featured = images[0];
  const secondary = images.slice(1, 5);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-14 text-center">

          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

            Featured Collection

          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">

            Moments That
            <span className="text-emerald-600">
              {" "}Inspire
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">

            A hand-picked collection of our most memorable travel
            experiences across the Himalayas.

          </p>

        </div>

        {/* Grid */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Large Image */}

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="group relative lg:col-span-2"
          >

            <button
              onClick={() => onImageClick?.(0)}
              className="relative h-[620px] w-full overflow-hidden rounded-[32px]"
            >

              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8">

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">

                  {featured.category}

                </span>

                <h3 className="mt-4 text-3xl font-bold text-white">

                  {featured.title}

                </h3>

              </div>

            </button>

          </motion.div>

          {/* Right Grid */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">

            {secondary.map((image, index) => (

              <motion.div
                key={image._id}
                whileHover={{ y: -4 }}
                className="group"
              >

                <button
                  onClick={() => onImageClick?.(index + 1)}
                  className="relative h-[295px] w-full overflow-hidden rounded-[28px]"
                >

                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5">

                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur">

                      {image.category}

                    </span>

                    <h4 className="mt-3 text-lg font-semibold text-white line-clamp-2">

                      {image.title}

                    </h4>

                  </div>

                </button>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Bottom Note */}

        <div className="mt-12 flex items-center justify-center gap-3 text-slate-500">

          <Camera className="h-5 w-5 text-emerald-600" />

          <span>

            Every image captures an authentic Altitude Escapes experience.

          </span>

        </div>

      </div>
    </section>
  );
}