import {
  AirVent,
  Bath,
  BedDouble,
  Car,
  Coffee,
  Dumbbell,
  Flame,
  Globe,
  Heart,
  Home,
  Laptop,
  ParkingCircle,
  ShieldCheck,
  Sparkles,
  Utensils,
  Wifi,
  Waves,
} from "lucide-react";

type Props = {
  amenities: string[];
};

const ICON_MAP = [
  {
    keywords: ["wifi", "wi-fi", "internet"],
    icon: Wifi,
  },
  {
    keywords: ["parking", "car"],
    icon: ParkingCircle,
  },
  {
    keywords: ["breakfast", "coffee"],
    icon: Coffee,
  },
  {
    keywords: ["restaurant", "dining", "food"],
    icon: Utensils,
  },
  {
    keywords: ["room service"],
    icon: BedDouble,
  },
  {
    keywords: ["air conditioning", "ac", "air conditioner"],
    icon: AirVent,
  },
  {
    keywords: ["bath", "bathtub"],
    icon: Bath,
  },
  {
    keywords: ["gym", "fitness"],
    icon: Dumbbell,
  },
  {
    keywords: ["pool", "swimming"],
    icon: Waves,
  },
  {
    keywords: ["bonfire", "fireplace", "fire"],
    icon: Flame,
  },
  {
    keywords: ["housekeeping", "cleaning"],
    icon: Sparkles,
  },
  {
    keywords: ["security", "safe"],
    icon: ShieldCheck,
  },
  {
    keywords: ["mountain", "view"],
    icon: Globe,
  },
  {
    keywords: ["spa", "wellness"],
    icon: Heart,
  },
  {
    keywords: ["workspace", "desk", "business"],
    icon: Laptop,
  },
];

function getAmenityIcon(amenity: string) {
  const normalized = amenity.toLowerCase();

  const matched = ICON_MAP.find(
    (item) =>
      item.keywords.some((keyword) =>
        normalized.includes(keyword)
      )
  );

  return matched?.icon || Home;
}

export default function HotelAmenities({
  amenities,
}: Props) {
  const uniqueAmenities = Array.from(
    new Set(
      amenities
        .map((amenity) => amenity.trim())
        .filter(Boolean)
    )
  );

  if (uniqueAmenities.length === 0) {
    return null;
  }

  return (
    <section
      id="amenities"
      className="scroll-mt-20 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Heading */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#087E8B]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#087E8B]">
                Comfort & Care
              </span>
            </div>

            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#071A33] sm:text-4xl">
              Everything you need,
              <span className="block text-[#087E8B]">
                nothing you don't.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#071A33]/50">
              Thoughtful details that make your time at
              the property comfortable, effortless and
              memorable.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full bg-[#FAF9F5] px-4 py-2 text-xs font-medium text-[#071A33]/55">
              {uniqueAmenities.length}{" "}
              {uniqueAmenities.length === 1
                ? "amenity"
                : "amenities"}{" "}
              available
            </div>
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {uniqueAmenities.map(
              (amenity, index) => {
                const Icon =
                  getAmenityIcon(amenity);

                return (
                  <div
                    key={`${amenity}-${index}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[#071A33]/8 bg-[#FAF9F5] p-4 transition duration-300 hover:border-[#087E8B]/20 hover:bg-white hover:shadow-[0_12px_35px_rgba(7,26,51,0.06)]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#087E8B] shadow-sm transition group-hover:bg-[#087E8B] group-hover:text-white">
                      <Icon
                        className="h-4.5 w-4.5"
                        strokeWidth={1.7}
                      />
                    </div>

                    <span className="text-sm font-medium text-[#071A33]/75">
                      {amenity}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}