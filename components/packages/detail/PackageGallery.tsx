"use client";

import Image from "next/image";
import { Camera } from "lucide-react";

interface PackageGalleryProps {
  heroImage: string;
  gallery: string[];
  packageName: string;
}

export default function PackageGallery({
  heroImage,
  gallery,
  packageName,
}: PackageGalleryProps) {
  const images = [heroImage, ...gallery].filter(Boolean);

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Gallery
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Explore The Journey
            </h2>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 md:flex">
            <Camera className="h-4 w-4 text-emerald-600" />
            {images.length} Photos
          </div>

        </div>

        <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-2">

          {/* Featured Image */}

          <div className="group relative overflow-hidden rounded-3xl lg:col-span-2 lg:row-span-2">

            <Image
              src={images[0]}
              alt={packageName}
              width={1200}
              height={900}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              priority
            />

          </div>

          {/* Grid Images */}

          {images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl"
            >
              <Image
                src={image}
                alt={`${packageName} ${index + 2}`}
                width={700}
                height={500}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Remaining Images */}

              {index === 3 && images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55">

                  <span className="text-3xl font-bold text-white">
                    +{images.length - 5}
                  </span>

                </div>
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}