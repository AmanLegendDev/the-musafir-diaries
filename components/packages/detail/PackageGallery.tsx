"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Images,
  X,
} from "lucide-react";

interface PackageGalleryProps {
  gallery: string[];
  heroImage: string;
  packageName: string;
}

export default function PackageGallery({
  gallery,
  heroImage,
  packageName,
}: PackageGalleryProps) {
  const images = Array.from(
    new Set([heroImage, ...(gallery || [])].filter(Boolean)),
  );

  const displayImages = images.slice(0, 7);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isLightboxOpen = activeIndex !== null;

  const showPrevious = () => {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === 0 ? displayImages.length - 1 : activeIndex - 1,
    );
  };

  const showNext = () => {
    if (activeIndex === null) return;

    setActiveIndex(
      activeIndex === displayImages.length - 1 ? 0 : activeIndex + 1,
    );
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  /*
   * Keyboard controls + body scroll lock
   */
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isLightboxOpen, activeIndex]);

  if (!images.length) return null;

  return (
    <>
      <section
        id="gallery"
        className="scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* ------------------------------------------------
              HEADER
          ------------------------------------------------ */}
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                  Through the lens
                </span>
              </div>

              <h2 className="mt-5 font-serif text-[40px] font-medium leading-[0.98] tracking-[-0.045em] text-[#071A33] sm:text-5xl lg:text-[64px]">
                Imagine yourself here.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#071A33]/50 sm:text-[15px]">
                A glimpse into the landscapes, places and moments that make
                this journey worth taking.
              </p>
            </div>

            <div className="flex items-center gap-3 text-[#071A33]/35">
              <Images
                className="h-4 w-4 text-[#1597C7]"
                strokeWidth={1.6}
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                {displayImages.length}{" "}
                {displayImages.length === 1 ? "moment" : "moments"}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------
              EDITORIAL GRID
          ------------------------------------------------ */}
          <div className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:mt-16 lg:auto-rows-[290px] lg:grid-cols-4">
            {displayImages.map((image, index) => {
              const featured = index === 0;
              const wide = index === 0 || index === 3;
              const tall = index === 1;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Open ${packageName} image ${index + 1}`}
                  className={[
                    "group relative overflow-hidden rounded-[22px] bg-[#071A33] text-left outline-none",
                    "focus-visible:ring-2 focus-visible:ring-[#1597C7] focus-visible:ring-offset-4",
                    featured ? "col-span-2 row-span-2" : "",
                    wide ? "sm:col-span-2" : "",
                    tall ? "row-span-2" : "",
                  ].join(" ")}
                >
                  <Image
                    src={image}
                    alt={`${packageName} — travel moment ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes={
                      featured
                        ? "(max-width: 639px) 100vw, (max-width: 1023px) 66vw, 50vw"
                        : "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    }
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />

                  {/* Very subtle cinematic overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071A33]/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"
                  />

                  {/* Image number */}
                  <span className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 bg-[#071A33]/25 px-2 text-[9px] font-semibold tracking-[0.12em] text-white/80 backdrop-blur-md sm:left-5 sm:top-5">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Open button */}
                  <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#071A33]/25 text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#1597C7]/70 group-hover:bg-[#1597C7] sm:bottom-5 sm:right-5 sm:h-10 sm:w-10">
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
                      strokeWidth={1.7}
                    />
                  </span>

                  {/* Hover label */}
                  <span className="absolute bottom-5 left-5 hidden text-[9px] font-semibold uppercase tracking-[0.22em] text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">
                    View image
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================
          FULLSCREEN LIGHTBOX
      ==================================================== */}
      {isLightboxOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#04101f]/95 p-3 backdrop-blur-xl sm:p-6 lg:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`${packageName} gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#1597C7]">
                {packageName}
              </p>

              <p className="mt-1 text-xs text-white/40">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(displayImages.length).padStart(2, "0")}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 backdrop-blur-md transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>

          {/* Main image area */}
          <div className="relative flex h-[72vh] w-full max-w-[1400px] items-center justify-center sm:h-[76vh] lg:h-[78vh]">
            <Image
              key={displayImages[activeIndex]}
              src={displayImages[activeIndex]}
              alt={`${packageName} — travel moment ${activeIndex + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />

            {/* Left arrow */}
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#071A33]/60 text-white backdrop-blur-md transition-all duration-200 hover:border-[#1597C7]/60 hover:bg-[#1597C7] sm:left-4 sm:h-12 sm:w-12 lg:left-6"
              >
                <ArrowLeft
                  className="h-5 w-5"
                  strokeWidth={1.6}
                />
              </button>
            )}

            {/* Right arrow */}
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#071A33]/60 text-white backdrop-blur-md transition-all duration-200 hover:border-[#1597C7]/60 hover:bg-[#1597C7] sm:right-4 sm:h-12 sm:w-12 lg:right-6"
              >
                <ArrowRight
                  className="h-5 w-5"
                  strokeWidth={1.6}
                />
              </button>
            )}
          </div>

          {/* Bottom thumbnail rail */}
          {displayImages.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 z-20 px-4 sm:bottom-6 sm:px-8">
              <div className="mx-auto flex max-w-[850px] items-center justify-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#071A33]/55 p-2 backdrop-blur-xl scrollbar-none">
                {displayImages.map((image, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={`thumb-${image}-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      className={[
                        "relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 sm:h-14 sm:w-20",
                        isActive
                          ? "border-[#1597C7] opacity-100 ring-1 ring-[#1597C7]/40"
                          : "border-white/10 opacity-50 hover:opacity-90",
                      ].join(" ")}
                    >
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}