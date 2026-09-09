import Image from "next/image";
import { ArrowUpRight, Images } from "lucide-react";

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
  const images = gallery.filter(Boolean);

  if (images.length === 0) {
    return (
      <section
        id="gallery"
        className="bg-[#FAF9F5] px-6 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] border border-[#071A33]/10 bg-white p-12 text-center">
            <Images className="mx-auto mb-5 text-[#087E8B]" size={30} />

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
              Gallery
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#071A33]">
              More moments from {destinationName}
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#071A33]/60">
              Destination photography will appear here soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="bg-[#FAF9F5] px-6 py-24 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087E8B]">
              A glimpse of {destinationName}
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] text-[#071A33] sm:text-5xl">
              Moments worth
              <span className="block text-[#087E8B]">
                remembering.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#071A33]/60">
            A visual collection from the landscapes, stays and moments that
            make this destination special.
          </p>
        </div>

        <div className="grid auto-rows-[240px] grid-cols-2 gap-4 md:auto-rows-[280px] md:grid-cols-4">
          {images.slice(0, 5).map((image, index) => (
            <a
              key={`${image}-${index}`}
              href={image}
              target="_blank"
              rel="noreferrer"
              className={[
                "group relative overflow-hidden rounded-[24px]",
                index === 0
                  ? "col-span-2 row-span-2"
                  : index === 1
                    ? "col-span-2 md:col-span-1"
                    : "",
              ].join(" ")}
            >
              <Image
                src={image}
                alt={`${destinationName} travel view ${index + 1}`}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/50 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#071A33] opacity-0 transition duration-300 group-hover:opacity-100">
                <ArrowUpRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}