import Link from "next/link";
import { ArrowDown, Hotel, MapPin } from "lucide-react";

type Props = {
  heroImage?: string;
};

export default function HotelHero({ heroImage }: Props) {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-[#071A33]">
      {/* Background */}
      <div className="absolute inset-0">
        {heroImage ? (
          <img
            src={heroImage}
            alt="Luxury stays in the Himalayas"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/home/hero/himalayan-hero.webp')",
            }}
          />
        )}

        <div className="absolute inset-0 bg-[#071A33]/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A33]/90 via-[#071A33]/55 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-end px-6 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <Hotel className="h-4 w-4 text-[#F59E0B]" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/75">
              Stays · Comfort · Place
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-7xl">
            Stay somewhere
            <span className="block text-[#F59E0B]">
              worth remembering.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Discover thoughtfully selected stays across the Himalayas —
            from charming boutique hotels to peaceful mountain retreats,
            chosen to make your journey feel even more special.
          </p>

          {/* Quick context */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white/85 backdrop-blur-md">
              <MapPin className="h-4 w-4 text-[#1597C7]" />
              Himachal Pradesh
            </div>

            <Link
              href="#hotels"
              className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
            >
              Explore stays
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom editorial line */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/45">
            The Musafir Diaries
          </p>

          <p className="hidden text-xs text-white/40 sm:block">
            Find your place in the mountains
          </p>
        </div>
      </div>
    </section>
  );
}