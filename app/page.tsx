import Image from "next/image";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.themusafirdiaries.com";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Musafir Diaries | Coming Soon",
  description:
    "The Musafir Diaries is crafting a beautiful new travel experience from Shimla, Himachal Pradesh.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "The Musafir Diaries | Coming Soon",
    description:
      "A new travel experience is being crafted. The Musafir Diaries — Explore • Experience • Memories.",
    url: SITE_URL,
    siteName: "The Musafir Diaries",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF9F5] px-6 text-[#071A33]">
      {/* Soft background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#087E8B]/[0.045] blur-3xl" />

        <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[#1597C7]/[0.055] blur-3xl" />

        <div className="absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-[#F59E0B]/[0.055] blur-3xl" />
      </div>

      {/* Minimal decorative lines */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#087E8B]/30 to-transparent" />

      <div className="pointer-events-none absolute bottom-10 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent" />

      {/* Main content */}
      <section className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        {/* Logo */}
        <div className="relative mb-9 h-44 w-44 sm:h-52 sm:w-52">
          <Image
            src="/logo.png"
            alt="The Musafir Diaries"
            fill
            priority
            className="object-contain drop-shadow-[0_18px_35px_rgba(7,26,51,0.10)]"
            sizes="208px"
          />
        </div>

        {/* Small status */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#087E8B]/15 bg-white/75 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F59E0B] opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F59E0B]" />
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#087E8B]">
            Website in the making
          </span>
        </div>

        {/* Main message */}
        <h1 className="font-serif text-4xl font-medium leading-[1.08] tracking-[-0.025em] sm:text-5xl md:text-6xl">
          Your journey is
          <span className="block italic text-[#087E8B]">
            taking shape.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#5B687A] sm:text-base">
          We&apos;re carefully crafting a beautiful travel experience for
          <span className="font-semibold text-[#071A33]">
            {" "}
            The Musafir Diaries
          </span>
          {" — "}
          from the mountains of Shimla to destinations beyond.
        </p>

        {/* Brand line */}
        <div className="mt-9 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#718096]">
          <span>Explore</span>
          <span className="text-[#F59E0B]">•</span>
          <span>Experience</span>
          <span className="text-[#087E8B]">•</span>
          <span>Memories</span>
        </div>

        {/* Location */}
        <div className="mt-12 flex items-center gap-2 text-xs font-medium text-[#8A95A5]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
          Shimla · Himachal Pradesh
        </div>
      </section>
    </main>
  );
}