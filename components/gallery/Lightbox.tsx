"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface GalleryImage {
  _id: string;
  title: string;
  image: string;
  category: string;
  alt?: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowRight":
          onNext();
          break;

        case "ArrowLeft":
          onPrevious();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, onNext, onPrevious]);

  if (!images.length) return null;

  const image = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md"
        >
          {/* Close */}

          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous */}

          <button
            onClick={onPrevious}
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          {/* Next */}

          <button
            onClick={onNext}
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur transition hover:bg-white/20"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          {/* Image */}

          <div className="flex h-full items-center justify-center p-6 md:p-16">

            <motion.div
              key={image._id}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative h-[80vh] w-full max-w-6xl"
            >
              <Image
                src={image.image}
                alt={image.alt || image.title}
                fill
                priority
                className="object-contain"
              />
            </motion.div>

          </div>

          {/* Bottom Info */}

          <div className="absolute bottom-8 left-1/2 w-full max-w-4xl -translate-x-1/2 px-6 text-center">

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">

              {image.category}

            </span>

            <h2 className="mt-5 text-3xl font-bold text-white">

              {image.title}

            </h2>

            <p className="mt-3 text-slate-300">

              {currentIndex + 1} / {images.length}

            </p>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}