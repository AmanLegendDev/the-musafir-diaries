"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Home,
  RefreshCw,
} from "lucide-react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    /*
     * Keep production logging lightweight.
     * Avoid exposing the error message to visitors.
     */

    console.error(
      "The Musafir Diaries route error:",
      error,
    );
  }, [error]);

  return (
    <main className="min-h-screen bg-[#FAF9F5] px-6 py-20">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
        <section
          aria-labelledby="error-title"
          className="
            w-full
            rounded-[32px]
            border
            border-[#071A33]/8
            bg-white
            px-6
            py-10
            text-center
            shadow-[0_20px_70px_rgba(7,26,51,0.08)]
            sm:px-10
            sm:py-12
          "
        >
          {/* =================================================
              ERROR ICON
          ================================================== */}

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-[#F06A5B]/10
              text-[#F06A5B]
            "
            aria-hidden="true"
          >
            <AlertTriangle
              size={30}
              strokeWidth={1.8}
            />
          </div>

          {/* =================================================
              EYEBROW
          ================================================== */}

          <p
            className="
              mt-7
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#087E8B]
            "
          >
            Something went wrong
          </p>

          {/* =================================================
              HEADING
          ================================================== */}

          <h1
            id="error-title"
            className="
              mt-3
              font-heading
              text-3xl
              font-semibold
              tracking-tight
              text-[#071A33]
              sm:text-4xl
            "
          >
            We couldn’t load this page
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              mx-auto
              mt-4
              max-w-lg
              text-sm
              leading-7
              text-[#071A33]/60
              sm:text-base
            "
          >
            Something unexpected happened while
            loading this page. You can try again or
            return to The Musafir Diaries homepage.
          </p>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div
            className="
              mt-8
              flex
              flex-col
              items-stretch
              justify-center
              gap-3
              sm:flex-row
              sm:items-center
            "
          >
            {/* Retry */}

            <button
              type="button"
              onClick={reset}
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#071A33]
                px-6
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_30px_rgba(7,26,51,0.15)]
                transition
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#0D2747]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1597C7]
                focus-visible:ring-offset-2
                active:translate-y-0
              "
            >
              <RefreshCw
                size={17}
                aria-hidden="true"
              />

              Try Again
            </button>

            {/* Home */}

            <Link
              href="/"
              className="
                inline-flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#071A33]/12
                bg-[#FAF9F5]
                px-6
                text-sm
                font-semibold
                text-[#071A33]
                transition
                duration-200
                hover:-translate-y-0.5
                hover:border-[#087E8B]/30
                hover:bg-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1597C7]
                focus-visible:ring-offset-2
                active:translate-y-0
              "
            >
              <Home
                size={17}
                aria-hidden="true"
              />

              Back Home
            </Link>
          </div>

          {/* =================================================
              SECONDARY NAVIGATION
          ================================================== */}

          <div className="mt-7 flex items-center justify-center">
            <Link
              href="/destinations"
              className="
                inline-flex
                items-center
                gap-1.5
                text-sm
                font-medium
                text-[#087E8B]
                underline-offset-4
                transition
                hover:text-[#071A33]
                hover:underline
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#1597C7]
                focus-visible:ring-offset-4
              "
            >
              <ArrowLeft
                size={15}
                aria-hidden="true"
              />

              Explore destinations
            </Link>
          </div>

          {/* =================================================
              SUPPORTING TEXT
          ================================================== */}

          <p className="mt-8 text-xs text-[#071A33]/35">
            If the problem continues, please try
            refreshing the page after a moment.
          </p>
        </section>
      </div>
    </main>
  );
}