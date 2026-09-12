import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MessageCircle,
} from "lucide-react";

import { TERMS_CONFIG } from "@/lib/config/terms";

export default function TermsContact() {
  return (
    <section
      id="terms-contact"
      className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-[#F59E0B]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
                Questions
              </span>
            </div>

            <h2 className="mt-5 max-w-sm font-serif text-3xl leading-[1.08] tracking-[-0.035em] text-[#071A33] sm:text-4xl">
              Need clarity before you travel?
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#071A33]/50">
              If you have a question about these terms, your
              booking or a journey you are considering, get in
              touch with us.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Email */}
            <a
              href={`mailto:${TERMS_CONFIG.email}`}
              className="group rounded-2xl border border-[#071A33]/10 bg-[#FAF9F5] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#087E8B]/25 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071A33] text-[#8ED9DF]">
                  <Mail
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <ArrowUpRight
                  className="h-4 w-4 text-[#071A33]/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#087E8B]"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071A33]/35">
                Email
              </p>

              <p className="mt-2 break-words font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                {TERMS_CONFIG.email}
              </p>
            </a>

            {/* Contact Page */}
            <Link
              href="/contact"
              className="group rounded-2xl border border-[#071A33]/10 bg-[#071A33] p-6 text-white transition-all duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#8ED9DF]">
                  <MessageCircle
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <ArrowUpRight
                  className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Contact page
              </p>

              <p className="mt-2 font-serif text-xl tracking-[-0.02em] text-white">
                Start a conversation
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}