import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Phone,
} from "lucide-react";

interface DestinationCTAProps {
  destinationName: string;
}

export default function DestinationCTA({
  destinationName,
}: DestinationCTAProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">

        <div
          className="
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-r
            from-emerald-700
            via-emerald-600
            to-teal-600
            px-6
            py-12
            text-white
            shadow-2xl

            md:px-10
            lg:px-16
            lg:py-16
          "
        >
          <div className="mx-auto max-w-4xl text-center">

            <span
              className="
                inline-flex
                rounded-full
                bg-white/15
                px-4
                py-2
                text-sm
                font-medium
                backdrop-blur
              "
            >
              Start Your Journey
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
              Ready to Explore{" "}
              <span className="text-yellow-300">
                {destinationName}
              </span>
              ?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
              Let our travel experts help you plan the
              perfect itinerary. Contact us today for
              personalized packages, expert guidance and a
              hassle-free booking experience.
            </p>

            <div
              className="
                mt-10
                flex
                flex-col
                justify-center
                gap-4

                sm:flex-row
              "
            >
              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-8
                  py-4
                  font-semibold
                  text-emerald-700
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                Plan My Trip

                <ArrowRight className="h-5 w-5" />
              </Link>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/40
                  bg-white/10
                  px-8
                  py-4
                  font-semibold
                  text-white
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:bg-white/20
                "
              >
                <MessageCircle className="h-5 w-5" />

                WhatsApp
              </a>

              <a
                href="tel:+919999999999"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/40
                  bg-transparent
                  px-8
                  py-4
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-white/10
                "
              >
                <Phone className="h-5 w-5" />

                Call Now
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}