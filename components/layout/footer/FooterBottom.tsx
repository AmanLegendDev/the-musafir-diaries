
import Link from "next/link";
import BackToTop from "./BackToTop";

export default function FooterBottom() {
  return (
    <div className="flex flex-col gap-6 py-7 sm:flex-row sm:items-center sm:justify-between">
      {/* Copyright */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-[11px] text-white/35">
          © {new Date().getFullYear()} The Musafir Diaries. All rights reserved.
        </p>

        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

        <p className="text-[11px] text-white/25">
          Crafted for journeys worth remembering.
        </p>
      </div>

      {/* Legal + Credit + Back to Top */}
      <div className="flex flex-wrap items-center gap-5">
        <Link
          href="/privacy-policy"
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms-and-conditions"
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          Terms & Conditions
        </Link>

        <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

        <Link
          href="https://amandigitalsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-white/35 transition-colors hover:text-white"
        >
          Built with <span className="text-[#F06A5B]">♥</span> by{" "}
          <span className="text-white/50 hover:text-[#F59E0B]">
            Aman Digital Solutions
          </span>
        </Link>

        <BackToTop />
      </div>
    </div>
  );
}
