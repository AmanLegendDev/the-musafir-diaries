import { MessageCircle } from "lucide-react";

import { WHATSAPP_HREF } from "./whatsapp.config";

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with The Musafir Diaries on WhatsApp"
      className="
        group fixed bottom-5 right-5 z-[80]
        flex items-center gap-3
        rounded-full
        border border-white/15
        bg-[#071A33]
        px-3 py-3
        text-white
        shadow-[0_18px_50px_rgba(7,26,51,0.25)]
        backdrop-blur-md
        transition-[box-shadow,transform] duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_22px_60px_rgba(7,26,51,0.32)]
        active:scale-[0.97]
        sm:bottom-7 sm:right-7
        sm:px-4 sm:py-3.5
        motion-reduce:transition-none
      "
    >
      <span
        className="
          relative flex h-11 w-11 shrink-0
          items-center justify-center
          rounded-full
          bg-[#087E8B]
          text-white
          shadow-[0_8px_25px_rgba(8,126,139,0.25)]
        "
      >
        <span
          aria-hidden="true"
          className="
            absolute inset-0
            rounded-full
            bg-[#087E8B]
            opacity-20
            animate-ping
            motion-reduce:animate-none
          "
        />

        <MessageCircle
          size={21}
          strokeWidth={2.2}
          aria-hidden="true"
          className="relative"
        />
      </span>

      <span className="hidden pr-1 text-left sm:block">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
          Plan your journey
        </span>

        <span className="mt-0.5 block text-sm font-semibold text-white">
          Chat with us
        </span>
      </span>
    </a>
  );
}