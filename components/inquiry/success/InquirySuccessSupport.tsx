import {
  Mail,
  MessageCircle,
} from "lucide-react";

const SUPPORT = {
  email: "hello@themusafirdiaries.com",
  whatsapp: "https://wa.me/919999999999",
};

export default function InquirySuccessSupport() {
  return (
    <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-18 lg:px-8 lg:pb-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-[1.75rem] border border-[#087E8B]/15 bg-[#E7F4F5]/45 p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
              Need to add something?
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#071A33] sm:text-3xl">
              Keep your reference handy.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#071A33]/60">
              If you need to share an additional detail about
              your request, you can use the contact options
              below and mention your inquiry reference.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${SUPPORT.email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white transition hover:bg-[#0D2747] focus:outline-none focus:ring-4 focus:ring-[#087E8B]/20"
            >
              <Mail size={16} />
              Email us
            </a>

            <a
              href={SUPPORT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#071A33]/10 bg-white px-5 text-sm font-semibold text-[#071A33] transition hover:border-[#087E8B]/30 hover:text-[#087E8B] focus:outline-none focus:ring-4 focus:ring-[#087E8B]/20"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          <p className="mt-4 text-[11px] leading-5 text-[#071A33]/45">
            Demo contact details are currently configured for
            this project and should be replaced with the
            client&apos;s final contact details before launch.
          </p>
        </div>
      </div>
    </section>
  );
}