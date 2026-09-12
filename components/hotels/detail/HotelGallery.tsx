"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

type Props = {
  heroImage: string;
  gallery: string[];
  hotelName: string;
};

export default function HotelGallery({
  heroImage,
  gallery,
  hotelName,
}: Props) {
  const images = useMemo(() => {
    const allImages = [
      heroImage,
      ...gallery,
    ]
      .map((image) => image?.trim())
      .filter(Boolean);

    return Array.from(new Set(allImages));
  }, [heroImage, gallery]);

  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const dialogRef =
    useRef<HTMLDialogElement>(null);

  const selectedImage =
    selectedIndex !== null
      ? images[selectedIndex]
      : null;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (
      selectedIndex !== null &&
      !dialog.open
    ) {
      dialog.showModal();
    }

    if (
      selectedIndex === null &&
      dialog.open
    ) {
      dialog.close();
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex(
          (current) =>
            current === null
              ? 0
              : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex(
          (current) =>
            current === null
              ? 0
              : (current - 1 + images.length) %
                images.length
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [selectedIndex, images.length]);

  if (images.length === 0) {
    return null;
  }

  const visibleImages = images.slice(0, 7);

  return (
    <>
      <section
        id="gallery"
        className="scroll-mt-20 bg-[#071A33]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F59E0B]">
                  Inside the stay
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                See the place
                <span className="text-white/45">
                  {" "}
                  for yourself.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-white/45">
              A glimpse into {hotelName} and the
              spaces that make this stay special.
            </p>
          </div>

          {/* Gallery */}
          <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
            {visibleImages.map(
              (image, index) => {
                const isFirst = index === 0;
                const isLastVisible =
                  index ===
                  visibleImages.length - 1;

                let className =
                  "relative overflow-hidden rounded-2xl";

                if (isFirst) {
                  className +=
                    " col-span-2 row-span-2";
                } else if (
                  index === 3 ||
                  index === 4
                ) {
                  className +=
                    " col-span-1 row-span-2";
                } else {
                  className +=
                    " col-span-1 row-span-1";
                }

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setSelectedIndex(index)
                    }
                    aria-label={`View image ${index + 1} of ${images.length}`}
                    className={`${className} group block text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A33]`}
                  >
                    <img
                      src={image}
                      alt={`${hotelName} — image ${index + 1}`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading={
                        index === 0
                          ? "eager"
                          : "lazy"
                      }
                    />

                    <div className="absolute inset-0 bg-[#071A33]/0 transition duration-300 group-hover:bg-[#071A33]/30" />

                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#071A33] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>

                    {/* Remaining count */}
                    {isLastVisible &&
                      images.length >
                        visibleImages.length && (
                        <span className="absolute bottom-4 right-4 rounded-full bg-[#071A33]/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                          +
                          {images.length -
                            visibleImages.length}{" "}
                          more
                        </span>
                      )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() =>
          setSelectedIndex(null)
        }
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-[#071A33]/96 p-0 text-white backdrop:bg-[#071A33]/95"
      >
        {selectedImage && (
          <div className="flex h-full min-h-screen flex-col">
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <p className="max-w-[70%] truncate text-xs font-medium text-white/55">
                {hotelName}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedIndex(null)
                }
                aria-label="Close gallery"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white hover:text-[#071A33]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Image */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-5 sm:px-12">
              <img
                src={selectedImage}
                alt={`${hotelName} — image ${
                  (selectedIndex ?? 0) + 1
                }`}
                className="max-h-[78vh] max-w-full rounded-xl object-contain"
              />

              {/* Previous */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (current) =>
                        current === null
                          ? 0
                          : (current -
                              1 +
                              images.length) %
                            images.length
                    )
                  }
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#071A33]/70 text-white backdrop-blur-md transition hover:bg-white hover:text-[#071A33] sm:left-8"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (current) =>
                        current === null
                          ? 0
                          : (current + 1) %
                            images.length
                    )
                  }
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#071A33]/70 text-white backdrop-blur-md transition hover:bg-white hover:text-[#071A33] sm:right-8"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Counter */}
            <div className="px-5 pb-6 text-center">
              <span className="text-xs font-medium text-white/40">
                {(selectedIndex ?? 0) + 1} /{" "}
                {images.length}
              </span>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}