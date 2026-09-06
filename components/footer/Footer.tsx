"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";

import type {
  FooterSection,
  SocialLink,
} from "./types";

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "X",
    href: "#",
    icon: FaXTwitter,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];
const sections: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "/destinations" },
      { label: "Packages", href: "/packages" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Top Destinations",
    links: [
      { label: "Shimla", href: "/destinations/shimla" },
      { label: "Manali", href: "/destinations/manali" },
      { label: "Spiti Valley", href: "/destinations/spiti-valley" },
      { label: "Kasol", href: "/destinations/kasol" },
      { label: "Dharamshala", href: "/destinations/dharamshala" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "FAQs", href: "/faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#081C2D]
        text-white
      "
    >
      {/* Luxury Top Gradient */}

      <div
        className="
          h-[2px]
          w-full
          bg-gradient-to-r
          from-[#3BAEA0]
          via-[#0F4C81]
          to-[#3BAEA0]
        "
      />

      {/* Background Glow */}

      <div
        className="
          absolute
          -top-40
          left-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          rounded-full
          bg-[#3BAEA0]/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          py-20
          lg:px-8
        "
      >
        {/* Top */}

        <div
          className="
            grid
            gap-14

            lg:grid-cols-[1.2fr_2fr]
          "
        >
          <FooterBrand
            socialLinks={socialLinks}
          />

          <FooterLinks
            sections={sections}
          />
        </div>

        {/* Newsletter */}

        <div className="mt-20">
          <FooterNewsletter
            title="Join Our Travel Community"
            description="Subscribe for exclusive Himalayan travel offers, destination guides, and inspiring adventure stories delivered directly to your inbox."
          />
        </div>

        {/* Bottom */}

        <FooterBottom
          year={new Date().getFullYear()}
        />
      </div>
    </footer>
  );
}