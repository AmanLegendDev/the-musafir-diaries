"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Expand, Camera } from "lucide-react";

interface GalleryCardProps {
  image: {
    _id: string;
    title: string;
    image: string;
    category: string;
    alt?: string;
  };
  index: number;
  onClick?: (index: number) => void;
}

export default function GalleryCard({
  image,
  index,
  onClick,
}: GalleryCardProps) {
  return (
    <motion.button
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick?.(index)}
      className="group relative w-full overflow-hidden rounded-[28px] bg-slate-100"
    >
      <div className="relative aspect-[4/5] overflow-hidden">

        <Image
          src={image.image}
          alt={image.alt || image.title}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

      </div>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Expand Icon */}

      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-xl opacity-0 transition duration-500 group-hover:opacity-100">

        <Expand className="h-5 w-5 text-white" />

      </div>

      {/* Content */}

      <div className="absolute bottom-0 left-0 right-0 translate-y-6 p-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">

        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-xl">

          <Camera className="h-3.5 w-3.5 text-emerald-400" />

          <span className="text-xs font-medium uppercase tracking-wide text-white">

            {image.category}

          </span>

        </div>

        <h3 className="mt-4 text-xl font-bold text-white line-clamp-2">

          {image.title}

        </h3>

      </div>

    </motion.button>
  );
}