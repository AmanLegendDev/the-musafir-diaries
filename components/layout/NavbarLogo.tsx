import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link
      href="/"
      aria-label="The Musafir Diaries home"
      className="group flex shrink-0 items-center gap-2.5"
    >
      {/* Brand mark */}
      <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center">
        <Image
          src="/logo.png"
          alt="The Musafir Diaries"
          width={52}
          height={52}
          priority
          className="h-[52px] w-[52px] object-contain transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </span>

      {/* Brand name */}
      <span className="flex flex-col leading-[0.9]">
        <span className="font-serif text-[16px] font-semibold tracking-[-0.025em] text-[#071A33]">
          The Musafir
        </span>

        <span className="mt-1 font-serif text-[16px] font-semibold tracking-[-0.025em] text-[#087E8B]">
          Diaries
        </span>
      </span>
    </Link>
  );
}