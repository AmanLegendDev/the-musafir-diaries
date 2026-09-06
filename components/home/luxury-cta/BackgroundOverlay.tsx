import Image from "next/image";

export default function BackgroundOverlay() {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta/luxury-cta-bg.jpg"
          alt="Luxury Himalayan Landscape"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
      </div>

      {/* Primary Dark Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/60
        "
      />

      {/* Luxury Blue Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#0F4C81]/80
          via-[#0F4C81]/40
          to-black/70
        "
      />

      {/* Top Fade */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-black/50
          to-transparent
        "
      />

      {/* Bottom Fade */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-black/60
          to-transparent
        "
      />

      {/* Soft Radial Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#3BAEA0]/10
          blur-3xl
        "
      />

      {/* Vignette */}
      <div
        className="
          absolute
          inset-0
          shadow-[inset_0_0_180px_rgba(0,0,0,0.55)]
        "
      />
    </>
  );
}