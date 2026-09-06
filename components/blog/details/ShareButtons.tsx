"use client";

import { useState } from "react";

import {
  Check,
  Copy,

  MessageCircle,
  Share2,
} from "lucide-react";

import {
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({
  title,
  url,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,

    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,

    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,

    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-emerald-100 p-3">

          <Share2 className="h-5 w-5 text-emerald-600" />

        </div>

        <div>

          <h3 className="font-bold text-slate-900">
            Share Article
          </h3>

          <p className="text-sm text-slate-500">
            Share with your friends
          </p>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 transition hover:border-emerald-500 hover:bg-emerald-50"
        >
          <MessageCircle className="h-5 w-5 text-emerald-600" />
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 transition hover:border-blue-500 hover:bg-blue-50"
        >
          <FaFacebookF  className="h-5 w-5 text-blue-600" />
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 transition hover:border-sky-500 hover:bg-sky-50"
        >
          <FaLinkedinIn  className="h-5 w-5 text-sky-600" />
        </a>

        <button
          onClick={copyLink}
          className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 transition hover:border-emerald-500 hover:bg-emerald-50"
        >
          {copied ? (
            <Check className="h-5 w-5 text-emerald-600" />
          ) : (
            <Copy className="h-5 w-5 text-slate-700" />
          )}
        </button>

      </div>

    </div>
  );
}