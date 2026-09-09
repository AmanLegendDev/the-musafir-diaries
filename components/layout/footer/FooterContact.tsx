"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function FooterContact() {
  return (
    <div>
      <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1597C7]">
        Let&apos;s Connect
      </p>

      <p className="max-w-xs text-sm leading-7 text-white/50">
        Planning a Himalayan escape? Tell us what you have
        in mind and let&apos;s shape the journey together.
      </p>

      <div className="mt-8 space-y-5">
        {/* Location */}
        <div className="flex gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />

          <div>
            <p className="text-xs font-medium text-white/80">
              Based in the Himalayas
            </p>
            <p className="mt-1 text-xs text-white/40">
              Shimla, Himachal Pradesh, India
            </p>
          </div>
        </div>

        {/* Email */}
        <Link
          href="mailto:hello@themusafirdiaries.com"
          className="group flex gap-3"
        >
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />

          <div>
            <p className="text-xs font-medium text-white/80 transition-colors group-hover:text-white">
              Email us
            </p>

            <p className="mt-1 text-xs text-white/40 transition-colors group-hover:text-[#1597C7]">
              hello@themusafirdiaries.com
            </p>
          </div>
        </Link>

        {/* Phone */}
        <div className="flex gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#F59E0B]" />

          <div>
            <p className="text-xs font-medium text-white/80">
              Speak with us
            </p>

            <p className="mt-1 text-xs text-white/40">
              Available for journey enquiries
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/inquiry"
        className="group mt-9 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-sm font-medium text-white transition-colors duration-300 hover:border-[#F59E0B]"
      >
        Plan your journey

        <ArrowUpRight className="h-4 w-4 text-[#F59E0B] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}