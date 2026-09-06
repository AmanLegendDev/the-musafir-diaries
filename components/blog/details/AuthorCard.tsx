"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa6";
import {
  Globe,
  PenSquare,
} from "lucide-react";

interface AuthorCardProps {
  author: {
    name: string;
    role: string;
    bio: string;
    image: string;
    articles: number;
    website?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export default function AuthorCard({
  author,
}: AuthorCardProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="p-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

          {/* Avatar */}

          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-emerald-100">

            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover"
            />

          </div>

          {/* Content */}

          <div className="flex-1">

            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              Meet the Author
            </span>

            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              {author.name}
            </h2>

            <p className="mt-1 font-medium text-emerald-600">
              {author.role}
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              {author.bio}
            </p>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 flex flex-col gap-5 border-t border-slate-100 pt-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3 text-slate-600">

            <PenSquare className="h-5 w-5 text-emerald-600" />

            <span className="font-medium">

              {author.articles}+ Articles Published

            </span>

          </div>

          <div className="flex items-center gap-3">

            {author.website && (
              <Link
                href={author.website}
                target="_blank"
                className="rounded-xl border border-slate-200 p-3 transition hover:border-emerald-500 hover:bg-emerald-50"
              >
                <Globe className="h-5 w-5 text-slate-700" />
              </Link>
            )}

            {author.instagram && (
              <Link
                href={author.instagram}
                target="_blank"
                className="rounded-xl border border-slate-200 p-3 transition hover:border-pink-500 hover:bg-pink-50"
              >
                <FaFacebookF className="h-5 w-5 text-slate-700" />
              </Link>
            )}

            {author.linkedin && (
              <Link
                href={author.linkedin}
                target="_blank"
                className="rounded-xl border border-slate-200 p-3 transition hover:border-sky-500 hover:bg-sky-50"
              >
                <FaLinkedinIn  className="h-5 w-5 text-slate-700" />
              </Link>
            )}

          </div>

        </div>

      </div>

    </motion.section>
  );
}