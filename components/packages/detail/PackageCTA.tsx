import Link from "next/link";
import {
  ArrowUpRight,
  Compass,
  MessageCircle,
} from "lucide-react";

interface PackageCTAProps {
  packageName: string;
  packageSlug: string;
}

export default function PackageCTA({
  packageName,
  packageSlug,
}: PackageCTAProps) {
  return (
    <section className="bg-[#071A33]">
      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="relative overflow-hidden rounded-[36px] bg-[#0D2747] px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#1597C7]/10"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-[#F59E0B]/10"
          />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#F59E0B]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
                  Your story starts here
                </span>
              </div>

              <h2 className="mt-6 max-w-4xl font-serif text-4xl font-medium leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
                Ready to make{" "}
                <span className="text-[#1597C7]">
                  {packageName}
                </span>{" "}
                yours?
              </h2>

              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
                Tell us your dates, group and preferences. We’ll
                help shape the journey around you.
              </p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="flex w-full max-w-[340px] flex-col gap-3">
                <Link
                  href={`/inquiry?package=${encodeURIComponent(
                    packageSlug
                  )}`}
                  className="group flex items-center justify-between rounded-full bg-[#F59E0B] px-5 py-3.5 text-sm font-semibold text-[#071A33] transition-colors hover:bg-[#FAF9F5]"
                >
                  Plan this journey

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#071A33] text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </Link>

                <Link
                  href="/inquiry"
                  className="flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-white/75 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <MessageCircle
                    className="h-4 w-4"
                    strokeWidth={1.6}
                  />
                  Talk to our travel team
                </Link>
              </div>
            </div>
          </div>

          <div className="relative mt-12 flex items-center gap-3 border-t border-white/10 pt-5">
            <Compass
              className="h-4 w-4 text-[#1597C7]"
              strokeWidth={1.6}
            />

            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
              Explore · Experience · Belong
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}