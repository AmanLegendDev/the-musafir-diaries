import Image from "next/image";
import {
  Images,
  ArrowUpRight,
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
    new Set(
      [heroImage, ...(gallery || [])].filter(
        Boolean
      )
    )
  );

  if (!images.length) return null;

  const displayImages = images.slice(0, 7);

  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
                Through the lens
              </span>
            </div>

            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-6xl">
              Imagine yourself here.
            </h2>
          </div>

          <div className="flex items-center gap-3 text-[#071A33]/30">
            <Images
              className="h-4 w-4 text-[#1597C7]"
              strokeWidth={1.6}
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
              {displayImages.length} moments
            </span>
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:gap-4 lg:auto-rows-[300px] lg:grid-cols-4">
          {displayImages.map((image, index) => {
            const featured = index === 0;
            const wide = index === 0 || index === 3;
            const tall = index === 1;

            return (
              <div
                key={`${image}-${index}`}
                className={[
                  "group relative overflow-hidden rounded-[22px] bg-[#071A33]",
                  featured
                    ? "col-span-2 row-span-2"
                    : "",
                  wide
                    ? "sm:col-span-2"
                    : "",
                  tall
                    ? "row-span-2"
                    : "",
                ].join(" ")}
              >
                <Image
                  src={image}
                  alt={`${packageName} — travel moment ${index + 1}`}
                  fill
                  sizes={
                    featured
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071A33]/50 via-transparent to-transparent opacity-70"
                />

                <div className="absolute bottom-4 left-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#071A33]/25 text-white/70 backdrop-blur-md transition-all duration-300 group-hover:bg-[#1597C7] group-hover:text-white">
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45"
                    strokeWidth={1.7}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}