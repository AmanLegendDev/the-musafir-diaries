"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, ArrowUpRight } from "lucide-react";

import type {
  GalleryCardProps,
} from "./types";

export default function GalleryCard({
  image,
  index,
}: GalleryCardProps) {
  const largeCard =
    index === 0 || index === 5;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      whileHover={{
        y: -8,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[30px]
        cursor-pointer

        ${
          largeCard
            ? "md:row-span-2 h-[520px]"
            : "h-[250px]"
        }
      `}
    >
      <Image
        src={image.image}
        alt={image.alt || image.title}
        fill
        className="
          object-cover
          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      {/* Luxury Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
          opacity-90
        "
      />

      {/* Category */}

      <div className="absolute left-6 top-6">
        <span
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-white/10
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.15em]
            text-white
            backdrop-blur-md
          "
        >
          <Camera size={14} />

          {image.category}
        </span>
      </div>

      {/* Content */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-8
        "
      >
                <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
        >
          <h3
            className="
              text-2xl
              font-bold
              text-white
              drop-shadow-lg
            "
          >
            {image.title}
          </h3>

          {image.description && (
            <p
              className="
                mt-3
                max-w-sm
                text-sm
                leading-6
                text-white/85
              "
            >
              {image.description}
            </p>
          )}

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                font-semibold
                text-white
              "
            >
              Explore Gallery
            </span>

            <motion.div
              whileHover={{
                rotate: 45,
                scale: 1.08,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                text-white
                backdrop-blur-md
              "
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Hover Accent */}

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileHover={{
          scaleX: 1,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-full
          origin-left
          bg-gradient-to-r
          from-[#0F4C81]
          via-[#3BAEA0]
          to-white
        "
      />
    </motion.article>
  );
}