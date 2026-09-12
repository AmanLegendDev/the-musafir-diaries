import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/images/blog/blog-hero.jpg";

export default function BlogHero() {
  return (
    <section className="relative isolate min-h-[620px] overflow-hidden bg-[#071A33] sm:min-h-[680px] lg:min-h-[720px]">
      <Image
        src={HERO_IMAGE}
        alt="Himalayan mountains and landscapes"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-[#071A33]/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-[#071A33]/25 to-transparent" />

      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-5 pb-16 sm:min-h-[680px] sm:px-8 sm:pb-20 lg:min-h-[720px] lg:px-10 lg:pb-24">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#F59E0B] sm:text-sm">
            The Musafir Journal
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
            Stories from
            <span className="block text-[#FAF9F5]">the mountains.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Travel deeper, wander slower, and discover the places, people,
            experiences, and stories that make every Himalayan journey worth
            remembering.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="#stories"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#071A33] transition hover:bg-[#FAF9F5]"
            >
              Explore stories
            </Link>

            <Link
              href="/destinations"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/15"
            >
              Explore destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}