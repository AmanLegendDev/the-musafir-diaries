import Link from "next/link";
import { HERO_TRUST_ITEMS } from "./heroData";
export default function HeroTrustBar() {
  return (
    <div className="relative z-20 border-t border-white/10 bg-[#071A33]/90 backdrop-blur-md lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:bg-[#071A33]/35">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-4 text-center sm:justify-start lg:px-12 xl:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-4 text-center sm:justify-start lg:px-12 xl:px-16">
  {HERO_TRUST_ITEMS.map((item, index) => (
    <div
      key={item.label}
      className="flex items-center gap-x-6"
    >
      <Link
        href={item.href}
        className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/55 transition hover:text-white"
      >
        {item.label}
      </Link>

      {index < HERO_TRUST_ITEMS.length - 1 && (
        <span className="hidden h-1 w-1 rounded-full bg-[#F59E0B] sm:block" />
      )}
    </div>
  ))}
</div>
      </div>
    </div>
  );
}