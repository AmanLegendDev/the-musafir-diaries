"use client";

import { Bot } from "lucide-react";

interface AIButtonProps {
  onClick: () => void;
}

export default function AIButton({
  onClick,
}: AIButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open Altitude AI"
      className="
        fixed
        bottom-6
        right-6
        z-[999]

        flex
        h-16
        w-16
        items-center
        justify-center

        rounded-full

        bg-gradient-to-br
        from-emerald-600
        to-emerald-700

        text-white

        shadow-2xl
        shadow-emerald-500/30

        transition-all
        duration-300

        hover:scale-110
        hover:shadow-emerald-500/50

        active:scale-95
      "
    >
      <Bot className="h-7 w-7" />

      <span
        className="
          absolute

          -top-1
          -right-1

          flex
          h-4
          w-4
        "
      >
        <span
          className="
            absolute
            inline-flex
            h-full
            w-full
            animate-ping
            rounded-full
            bg-green-400
            opacity-75
          "
        />

        <span
          className="
            relative
            inline-flex
            h-4
            w-4
            rounded-full
            bg-green-500
          "
        />
      </span>
    </button>
  );
}