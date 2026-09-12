import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Star,
} from "lucide-react";

type RelatedHotel = {
  _id: string;
  name: string;
  slug: string;
  heroImage: string;
  hotelType: string;
  starRating: number;
  area: string;
  city: string;
  guestRating: number | null;
  reviewCount: number;
  featured: boolean;
};

type Props = {
  hotels: RelatedHotel[];
  destinationName: string;
  currentHotelSlug: string;
};

const HOTEL_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  resort: "Resort",
  boutique: "Boutique",
  homestay: "Homestay",
  villa: "Villa",
  guesthouse: "Guesthouse",
  camp: "Camp",
  other: "Stay",
};

export default function RelatedHotels({
  hotels,
  destinationName,
  currentHotelSlug,
}: Props) {
  const relatedHotels = hotels
    .filter(
      (hotel) =>
        hotel.slug !== currentHotelSlug
    )
    .slice(0, 3);

  if (relatedHotels.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#087E8B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
                Continue exploring
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
              More places to stay
              <span className="text-[#087E8B]">.</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#071A33]/50 sm:text-base">
              Discover more thoughtfully selected stays
              around {destinationName}.
            </p>
          </div>

          <Link
            href="/hotels"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#071A33] transition hover:text-[#087E8B]"
          >
            Explore all stays
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedHotels.map((hotel) => {
            const typeLabel =
              HOTEL_TYPE_LABELS[
                hotel.hotelType
              ] || "Stay";

            const hasGuestRating =
              hotel.guestRating !== null &&
              hotel.guestRating > 0 &&
              hotel.reviewCount > 0;

            const location = [
              hotel.area,
              hotel.city,
            ]
              .filter(Boolean)
              .filter(
                (value, index, array) =>
                  array.indexOf(value) ===
                  index
              )
              .join(", ");

            return (
              <article
                key={hotel._id}
                className="group overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-[#FAF9F5] transition duration-500 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(7,26,51,0.10)]"
              >
                <Link
                  href={`/hotels/${hotel.slug}`}
                  className="block"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={hotel.heroImage}
                      alt={hotel.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/60 via-transparent to-transparent" />

                    <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#071A33] backdrop-blur-sm">
                        {typeLabel}
                      </span>

                      {hotel.featured && (
                        <span className="rounded-full bg-[#F59E0B] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#071A33]">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Location on image */}
                    {location && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white/85">
                        <MapPin className="h-3.5 w-3.5 text-[#1597C7]" />
                        {location}
                      </div>
                    )}

                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#071A33] shadow-lg transition group-hover:bg-[#087E8B] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      {hotel.starRating > 0 ? (
                        <div className="flex gap-0.5">
                          {Array.from({
                            length: 5,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-3 w-3 ${
                                index <
                                hotel.starRating
                                  ? "fill-[#F59E0B] text-[#F59E0B]"
                                  : "text-[#071A33]/12"
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#071A33]/30">
                          Stay
                        </span>
                      )}

                      {hasGuestRating && (
                        <span className="text-xs font-semibold text-[#071A33]">
                          {hotel.guestRating?.toFixed(
                            1
                          )}
                          <span className="ml-1 font-normal text-[#071A33]/35">
                            ({hotel.reviewCount})
                          </span>
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 line-clamp-1 text-xl font-semibold tracking-[-0.02em] text-[#071A33]">
                      {hotel.name}
                    </h3>

                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.13em] text-[#087E8B]">
                      Discover this stay
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}