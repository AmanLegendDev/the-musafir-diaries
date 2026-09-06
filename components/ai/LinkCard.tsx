"use client";

import Link from "next/link";
import {
  ArrowRight,
  MapPinned,
  CalendarDays,
  MessageCircle,
  Phone,
  BookOpen,
  ImageIcon,
  Mountain,
} from "lucide-react";

interface LinkCardProps {
  url: string;
}

export default function LinkCard({
  url,
}: LinkCardProps) {
  let title = "Open Link";
  let subtitle = "Visit page";
  let icon = <ArrowRight size={20} />;

  let gradient =
    "from-emerald-600 to-teal-600";

  if (url.includes("/booking")) {
    title = "Book Your Trip";
    subtitle =
      "Secure your Himalayan journey";
    icon = (
      <CalendarDays size={20} />
    );
  }

  else if (
    url.includes("/inquiry")
  ) {
    title = "Send Inquiry";
    subtitle =
      "Talk with our travel experts";
    icon = (
      <MessageCircle size={20} />
    );
  }

  else if (
    url.includes("/contact")
  ) {
    title = "Contact Us";
    subtitle =
      "We're here to help";
    icon = <Phone size={20} />;
  }

  else if (
    url.includes("/packages/")
  ) {
    const slug =
      url.split("/packages/")[1];

    title = slug
      .split("-")
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

    subtitle =
      "View package details";

    icon = (
      <Mountain size={20} />
    );
  }

  else if (
    url.includes("/packages")
  ) {
    title = "Explore Packages";
    subtitle =
      "Discover all tour packages";

    icon = (
      <Mountain size={20} />
    );
  }

  else if (
    url.includes(
      "/destinations/"
    )
  ) {
    const slug =
      url.split(
        "/destinations/"
      )[1];

    title = slug
      .split("-")
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

    subtitle =
      "Explore destination";

    icon = (
      <MapPinned size={20} />
    );
  }

  else if (
    url.includes("/destinations")
  ) {
    title =
      "Explore Destinations";

    subtitle =
      "Browse Himalayan destinations";

    icon = (
      <MapPinned size={20} />
    );
  }

  else if (
    url.includes("/blogs")
  ) {
    title = "Travel Blogs";

    subtitle =
      "Read travel guides";

    icon = (
      <BookOpen size={20} />
    );
  }

  else if (
    url.includes("/gallery")
  ) {
    title = "Gallery";

    subtitle =
      "Explore beautiful moments";

    icon = (
      <ImageIcon size={20} />
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      className="
        mt-4
        flex
        items-center
        justify-between

        rounded-2xl

        border

        border-emerald-100

        bg-gradient-to-r

        from-white
        to-emerald-50

        p-4

        transition-all

        hover:scale-[1.02]

        hover:shadow-lg
      "
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center

            rounded-xl

            bg-gradient-to-br

            ${gradient}

            text-white
          `}
        >
          {icon}
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">
            {title}
          </h4>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      <ArrowRight
        className="text-emerald-600"
        size={18}
      />
    </Link>
  );
}