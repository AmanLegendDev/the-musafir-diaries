"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";

type Props = {
  blogUrl: string;
  title: string;
};

export default function BlogShare({
  blogUrl,
  title,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  const shareStory = async () => {
    if (typeof navigator === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: blogUrl,
        });
      } catch {
        // User cancelled the native share dialog.
      }

      return;
    }

    await copyLink();
  };

  return (
    <div className="flex flex-row items-center gap-3 lg:sticky lg:top-28 lg:flex-col lg:items-start">
      <div className="hidden lg:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#071A33]/40">
          Share story
        </p>
      </div>

      <button
        type="button"
        onClick={shareStory}
        aria-label="Share this story"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071A33]/10 bg-white text-[#071A33]/65 transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
      >
        <Share2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy article link"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-[#071A33]/10 bg-white text-[#071A33]/65 transition hover:border-[#087E8B]/30 hover:text-[#087E8B]"
      >
        {copied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>

      <span
        className={`text-xs font-medium transition ${
          copied
            ? "text-[#087E8B] opacity-100"
            : "pointer-events-none absolute opacity-0"
        }`}
        aria-live="polite"
      >
        Link copied
      </span>
    </div>
  );
}