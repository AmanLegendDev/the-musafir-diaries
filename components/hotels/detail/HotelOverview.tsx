import {
  Building2,
  MapPin,
  Mountain,
  Star,
} from "lucide-react";

type Destination = {
  name: string;
  slug: string;
  state?: string;
};

type Hotel = {
  name: string;
  shortDescription: string;
  description: string;
  area: string;
  address: string;
  city: string;
  state: string;
  country: string;
  starRating: number;
  hotelType: string;
  guestRating: number | null;
  reviewCount: number;
  destination: Destination;
};

type Props = {
  hotel: Hotel;
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

export default function HotelOverview({
  hotel,
}: Props) {
  const typeLabel =
    HOTEL_TYPE_LABELS[hotel.hotelType] || "Stay";

  const location = [
    hotel.area,
    hotel.city,
    hotel.state,
    hotel.country,
  ]
    .filter(Boolean)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    )
    .join(", ");

  const hasGuestRating =
    hotel.guestRating !== null &&
    hotel.guestRating > 0 &&
    hotel.reviewCount > 0;

  return (
    <section
      id="overview"
      className="scroll-mt-20 bg-[#FAF9F5]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Editorial content */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#087E8B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
                The Stay
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#071A33] sm:text-4xl lg:text-5xl">
              A place to slow down,
              <span className="block text-[#087E8B]">
                breathe and belong.
              </span>
            </h2>

            {hotel.shortDescription && (
              <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-[#071A33]/70">
                {hotel.shortDescription}
              </p>
            )}

            {hotel.description && (
              <div className="mt-6 max-w-2xl">
                <p className="whitespace-pre-line text-sm leading-7 text-[#071A33]/55 sm:text-[15px]">
                  {hotel.description}
                </p>
              </div>
            )}

            {/* Location */}
            {hotel.address && (
              <div className="mt-9 flex items-start gap-3 border-t border-[#071A33]/8 pt-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#087E8B]/8 text-[#087E8B]">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#071A33]/35">
                    Location
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#071A33]/65">
                    {hotel.address}
                  </p>

                  {location && (
                    <p className="mt-0.5 text-xs text-[#071A33]/40">
                      {location}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stay facts */}
          <div className="lg:pt-8">
            <div className="overflow-hidden rounded-[1.75rem] border border-[#071A33]/8 bg-white">
              <div className="border-b border-[#071A33]/8 px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#071A33]/35">
                  Stay details
                </p>
              </div>

              <div className="divide-y divide-[#071A33]/8">
                {/* Type */}
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#071A33] text-white">
                    <Building2 className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#071A33]/35">
                      Stay type
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#071A33]">
                      {typeLabel}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                {hotel.starRating > 0 && (
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]/12 text-[#F59E0B]">
                      <Star className="h-4 w-4 fill-current" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#071A33]/35">
                        Classification
                      </p>

                      <div className="mt-1 flex items-center gap-2">
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

                        <span className="text-xs font-medium text-[#071A33]/50">
                          {hotel.starRating}-star
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Guest rating */}
                {hasGuestRating && (
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
                      <Mountain className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#071A33]/35">
                        Guest rating
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#071A33]">
                        {hotel.guestRating?.toFixed(1)}
                        <span className="ml-2 text-xs font-normal text-[#071A33]/40">
                          from {hotel.reviewCount}{" "}
                          {hotel.reviewCount === 1
                            ? "review"
                            : "reviews"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Destination */}
                {hotel.destination?.name && (
                  <div className="px-6 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#071A33]/35">
                      Destination
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#071A33]">
                      {hotel.destination.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}