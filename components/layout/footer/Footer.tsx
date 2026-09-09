import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071A33] text-[#FAF9F5]">
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-[#087E8B]/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full bg-[#1597C7]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        {/* Main footer */}
        <div className="grid gap-14 border-b border-white/10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* Brand */}
          <div className="lg:col-span-5">
            <FooterBrand />
          </div>

          {/* Links */}
          <div className="lg:col-span-4">
            <FooterLinks />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterContact />
          </div>
        </div>

        {/* Bottom */}
        <FooterBottom />
      </div>
    </footer>
  );
}