import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

const SUPPORT = {
  phone: "999999999",
  email: "hello@themusafirdiaries.com",
  whatsapp: "https://wa.me/919999999999",
};

export default function BookingSuccessSupport() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-10 pt-4 sm:px-6 sm:pb-14 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-[#071A33]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Content */}
          <div className="p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1597C7]">
              Need help?
            </p>

            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Have a question about your request?
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
              If you need to update a detail or ask something about your
              journey request, use one of the contact options below.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#1597C7]"
            >
              Visit contact page
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Contact methods */}
          <div className="border-t border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:border-l lg:border-t-0">
            <div className="space-y-3">
              <a
                href={`tel:${SUPPORT.phone}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/15 text-[#1597C7]">
                  <Phone className="h-4 w-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    Phone
                  </span>

                  <span className="mt-1 block truncate text-sm font-medium text-white/80">
                    {SUPPORT.phone}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${SUPPORT.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/15 text-[#1597C7]">
                  <Mail className="h-4 w-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    Email
                  </span>

                  <span className="mt-1 block truncate text-sm font-medium text-white/80">
                    {SUPPORT.email}
                  </span>
                </span>
              </a>

              <a
                href={SUPPORT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/15 text-[#1597C7]">
                  <MessageCircle className="h-4 w-4" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    WhatsApp
                  </span>

                  <span className="mt-1 block text-sm font-medium text-white/80">
                    Start a conversation
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}