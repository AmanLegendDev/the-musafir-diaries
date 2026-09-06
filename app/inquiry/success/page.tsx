import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  Home,
  Phone,
} from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { id } = await searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <section className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-20">
        <div
          className="
            w-full
            rounded-[32px]
            border
            border-slate-200
            bg-white
            p-10
            text-center
            shadow-2xl

            lg:p-16
          "
        >
          {/* Success Icon */}

          <div
            className="
              mx-auto
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-emerald-500
              to-green-600
              text-white
              shadow-xl
            "
          >
            <CheckCircle2 size={50} />
          </div>

          {/* Heading */}

          <h1
            className="
              mt-8
              text-4xl
              font-bold
              text-[#081C2D]

              md:text-5xl
            "
          >
            Inquiry Submitted Successfully!
          </h1>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              leading-8
              text-slate-600
            "
          >
            Thank you for choosing
            <span className="font-semibold text-[#0F4C81]">
              {" "}
              Altitude Escapes
            </span>
            . Our travel experts have received your
            inquiry and will contact you shortly with
            a personalized travel plan.
          </p>

          {/* Inquiry ID */}

          {id && (
            <div
              className="
                mx-auto
                mt-10
                max-w-md
                rounded-2xl
                border
                border-[#3BAEA0]/20
                bg-[#3BAEA0]/5
                p-5
              "
            >
              <p className="text-sm text-slate-500">
                Inquiry Reference
              </p>

              <p
                className="
                  mt-2
                  break-all
                  font-mono
                  text-sm
                  font-semibold
                  text-[#0F4C81]
                "
              >
                #{id}
              </p>
            </div>
          )}

          {/* Timeline */}

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="font-semibold text-[#081C2D]">
                Step 1
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                Our travel expert reviews your
                inquiry.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="font-semibold text-[#081C2D]">
                Step 2
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                We'll contact you within
                <strong> 30 minutes</strong>.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="font-semibold text-[#081C2D]">
                Step 3
              </h3>

              <p className="mt-3 text-sm text-slate-600">
                Receive your customized itinerary &
                quotation.
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#0F4C81]
                px-7
                py-4
                font-semibold
                text-white
                transition
                hover:bg-[#0b3b64]
              "
            >
              <Home size={18} />

              Back to Home
            </Link>

            <Link
              href="/packages"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#0F4C81]
                px-7
                py-4
                font-semibold
                text-[#0F4C81]
                transition
                hover:bg-[#0F4C81]
                hover:text-white
              "
            >
              Explore Packages

              <ArrowRight size={18} />
            </Link>

            <Link
              href="tel:+919999999999"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-300
                px-7
                py-4
                font-semibold
                transition
                hover:border-[#3BAEA0]
              "
            >
              <Phone size={18} />

              Call Us
            </Link>
          </div>

          {/* Footer Note */}

          <p className="mt-12 text-sm text-slate-500">
            Need immediate assistance? Contact our
            travel team directly for faster support.
          </p>
        </div>
      </section>
    </main>
  );
}