import TermsSection from "./TermsSection";

const BOOKING_POINTS = [
  {
    title: "Enquiries are not automatically bookings",
    text: "Submitting an enquiry, contacting us through the website, WhatsApp, phone or another channel does not by itself create a confirmed booking.",
  },
  {
    title: "Availability must be confirmed",
    text: "A journey is subject to availability of the relevant accommodation, transportation and other services required for the itinerary.",
  },
  {
    title: "Booking confirmation",
    text: "A booking becomes confirmed only after the required arrangements have been agreed and the applicable booking or payment requirements have been completed.",
  },
  {
    title: "Accurate traveller information",
    text: "Travellers are responsible for providing accurate information needed to arrange their journey, including names, contact details, travel dates and other relevant requirements.",
  },
];

export default function TermsBooking() {
  return (
    <TermsSection
      id="bookings"
      number="01"
      title="Bookings & Enquiries"
      intro="Every journey starts with a conversation. A travel enquiry helps us understand what you are looking for, but a booking is confirmed only after the necessary arrangements and requirements have been completed."
    >
      <div className="space-y-4">
        {BOOKING_POINTS.map((item, index) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
          >
            <div className="flex gap-5">
              <span className="shrink-0 text-[10px] font-semibold tracking-[0.16em] text-[#F59E0B]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-l-2 border-[#087E8B]/40 bg-[#FAF9F5] px-5 py-5 sm:px-6">
        <p className="text-sm leading-7 text-[#071A33]/60">
          Specific booking conditions may also apply to an
          individual package, accommodation provider, transport
          operator or other service included in your journey.
        </p>
      </div>
    </TermsSection>
  );
}   