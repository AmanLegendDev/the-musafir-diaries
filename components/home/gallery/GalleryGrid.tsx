import GalleryCard from "./GalleryCard";

import type {
  GalleryGridProps,
} from "./types";

export default function GalleryGrid({
  images,
}: GalleryGridProps) {
  return (
    <div
      className="
        grid
        aauto-rows-[247px]
gap-6

        md:grid-cols-2

        xl:grid-cols-3
      "
    >
      {images.map((image, index) => (
        <GalleryCard
          key={image._id}
          image={image}
          index={index}
        />
      ))}
    </div>
  );
}