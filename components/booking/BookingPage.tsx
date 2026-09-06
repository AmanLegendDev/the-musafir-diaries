import BookingCTA from "./BookingCTA";
import BookingFeatures from "./BookingFeatures";
import BookingHelp from "./BookingHelp";
import BookingHero from "./BookingHero";
import BookingLayout from "./BookingLayout";
import BookingSummary from "./BookingSummary";
import BookingWizard from "./BookingWizard";

export default function BookingPage() {
  return (
    <>
      <BookingHero />

      <BookingLayout
        wizard={<BookingWizard />}
        summary={<BookingSummary />}
      />

      <BookingFeatures />

      <BookingHelp />

      <BookingCTA />
    </>
  );
}