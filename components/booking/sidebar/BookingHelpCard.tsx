import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

const CONTACT = {
  phone: "999999999",
  email: "hello@themusafirdiaries.com",
  whatsapp: "https://wa.me/919999999999",
};

export default function BookingHelpCard() {
  return (
    <section className="rounded-3xl border border-[#071A33]/10 bg-[#FAF9F5] p-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#087E8B]">
          Need assistance?
        </p>

        <h2 className="mt-2 text-base font-semibold text-[#071A33]">
          Planning something specific?
        </h2>

        <p className="mt-2 text-xs leading-5 text-[#071A33]/55">
          If you are unsure about a journey or need help with your travel
          details, you can contact us directly.
        </p>
      </div>

      <div className="mt-5 space-y-2.5">
        <a
          href={`tel:${CONTACT.phone}`}
          className="group flex items-center gap-3 rounded-xl border border-[#071A33]/10 bg-white px-3.5 py-3 transition hover:border-[#087E8B]/25"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[#087E8B]">
            <Phone className="h-3.5 w-3.5" />
          </span>

          <span className="min-w-0">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#071A33]/35">
              Phone
            </span>

            <span className="mt-0.5 block truncate text-xs font-medium text-[#071A33]">
              {CONTACT.phone}
            </span>
          </span>
        </a>

        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-xl border border-[#071A33]/10 bg-white px-3.5 py-3 transition hover:border-[#087E8B]/25"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[#087E8B]">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>

          <span className="min-w-0">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#071A33]/35">
              WhatsApp
            </span>

            <span className="mt-0.5 block truncate text-xs font-medium text-[#071A33]">
              Start a conversation
            </span>
          </span>
        </a>

        <a
          href={`mailto:${CONTACT.email}`}
          className="group flex items-center gap-3 rounded-xl border border-[#071A33]/10 bg-white px-3.5 py-3 transition hover:border-[#087E8B]/25"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#087E8B]/10 text-[#087E8B]">
            <Mail className="h-3.5 w-3.5" />
          </span>

          <span className="min-w-0">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#071A33]/35">
              Email
            </span>

            <span className="mt-0.5 block truncate text-xs font-medium text-[#071A33]">
              {CONTACT.email}
            </span>
          </span>
        </a>
      </div>

      <Link
        href="/contact"
        className="group mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#071A33] transition hover:text-[#087E8B]"
      >
        Contact page
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}