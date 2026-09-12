import {
  ArrowDown,
  MapPin,
  Star,
} from "lucide-react";

type HotelDestination = {
  name: string;
  slug: string;
  state?: string;
};

type HotelHeroData = {
  name: string;
  heroImage: string;
  hotelType: string;
  starRating: number;
  area: string;
  city: string;
  state: string;
  country: string;
  guestRating: number | null;
  reviewCount: number;
  featured: boolean;
  destination: HotelDestination;
};

type Props = {
  hotel: HotelHeroData;
};

const HOTEL_TYPE_LABELS: Record<string, string> = {
  hotel: "Hotel",
  resort: "Resort",
  boutique: "Boutique Stay",
  homestay: "Homestay",
  villa: "Villa",
  guesthouse: "Guesthouse",
  camp: "Mountain Camp",
  other: "Stay",
};

function StarRating({
  rating,
}: {
  rating: number;
}) {
  if (!rating || rating < 1) return null;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-3.5 w-3.5 ${
            index < rating
              ? "fill-[#F59E0B] text-[#F59E0B]"
              : "text-white/25"
          }`}
        />
      ))}
    </div>
  );
}

export default function HotelHero({
  hotel,
}: Props) {
  const typeLabel =
    HOTEL_TYPE_LABELS[hotel.hotelType] || "Stay";

  const hasGuestRating =
    hotel.guestRating !== null &&
    hotel.guestRating > 0 &&
    hotel.reviewCount > 0;

  const location = [
    hotel.area,
    hotel.city,
    hotel.state,
  ]
    .filter(Boolean)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    )
    .join(", ");

  return (
    <section className="relative isolate overflow-hidden bg-[#071A33] pt-4">
      {/* Hero image */}
      <div className="absolute inset-0 mt-4">
        <img
          src={hotel.heroImage}
          alt={hotel.name}
          className="h-full min-h-[620px] w-full object-cover object-center"
          fetchPriority="high"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-[#071A33]/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#071A33]/45 to-[#071A33]/15" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-transparent to-[#071A33]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl flex-col justify-end px-6 pb-12 pt-20 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        {/* Top editorial marker */}
        <div className="absolute left-6 top-8 flex items-center gap-3 sm:left-8 lg:left-12">
          <span className="h-px w-8 bg-white/40" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/55">
            The Musafir Diaries · Stay
          </span>
        </div>

        {/* Main content */}
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
              {typeLabel}
            </span>

            {hotel.featured && (
              <span className="rounded-full bg-[#F59E0B] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#071A33]">
                Featured Stay
              </span>
            )}
          </div>

          {/* Hotel name */}
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {hotel.name}
          </h1>

          {/* Meta */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            {/* Hotel classification */}
            {hotel.starRating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating
                  rating={hotel.starRating}
                />

                <span className="text-xs font-medium text-white/65">
                  {hotel.starRating}-star
                </span>
              </div>
            )}

            {/* Guest rating */}
            {hasGuestRating && (
              <>
                <span className="hidden h-4 w-px bg-white/20 sm:block" />

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                    {hotel.guestRating?.toFixed(1)}
                  </span>

                  <span className="text-xs text-white/55">
                    {hotel.reviewCount}{" "}
                    {hotel.reviewCount === 1
                      ? "review"
                      : "reviews"}
                  </span>
                </div>
              </>
            )}

            {/* Location */}
            {location && (
              <>
                <span className="hidden h-4 w-px bg-white/20 sm:block" />

                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="h-4 w-4 text-[#1597C7]" />
                  <span>{location}</span>
                </div>
              </>
            )}
          </div>

          {/* Destination context */}
          {hotel.destination?.name && (
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/55">
              A stay in{" "}
              <span className="font-medium text-white/80">
                {hotel.destination.name}
              </span>
              , thoughtfully selected for your Himalayan
              journey.
            </p>
          )}
        </div>

        {/* Bottom rail */}
        <div className="mt-12 flex items-end justify-between border-t border-white/15 pt-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
              Discover the stay
            </p>

            <p className="mt-1 text-xs text-white/50">
              Scroll to explore
            </p>
          </div>

          <a
            href="#overview"
            aria-label="Scroll to hotel overview"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white hover:text-[#071A33]"
          >
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}