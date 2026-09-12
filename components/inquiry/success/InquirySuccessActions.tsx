import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
} from "lucide-react";

interface InquirySuccessActionsProps {
  phone?: string;
}

export default function InquirySuccessActions({
  phone,
}: InquirySuccessActionsProps) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/destinations"
            className="group rounded-[1.5rem] border border-[#071A33]/8 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(7,26,51,0.07)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7F4F5] text-[#087E8B]">
              <Compass size={18} />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#071A33]">
              Explore more destinations
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#071A33]/55">
              Keep exploring places and experiences while
              your travel plan takes shape.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#087E8B]">
              Explore destinations
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          <Link
            href="/blog"
            className="group rounded-[1.5rem] border border-[#071A33]/8 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(7,26,51,0.07)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4DD] text-[#D88900]">
              <BookOpen size={18} />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-[#071A33]">
              Read The Musafir Journal
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#071A33]/55">
              Discover travel stories, destination notes and
              useful Himalayan travel inspiration.
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#087E8B]">
              Visit the journal
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}