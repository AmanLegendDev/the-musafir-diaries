import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
  return (
    <Link
      href="/"
      aria-label="The Musafir Diaries home"
      className="flex items-center gap-3"
    >
      {/* Logo */}
     <div className="relative h-[60px] w-[60px] shrink-0">
  <Image
    src="/logo.png"
    alt="The Musafir Diaries"
    width={60}
    height={60}
    priority
    className="h-[60px] w-[60px] object-contain"
  />
</div>

      {/* Brand Name */}
      <span className="flex flex-col leading-[0.95]">
        <span className="font-serif text-[17px] font-bold tracking-[-0.025em] text-[#071A33]">
          The Musafir
        </span>

        <span className="mt-1 font-serif text-[17px] font-bold tracking-[-0.025em] text-[#087E8B]">
          Diaries
        </span>
      </span>
    </Link>
  );
}