import TermsHero from "./TermsHero";
import TermsIntro from "./TermsIntro";
import TermsContents from "./TermsContents";

import TermsBooking from "./TermsBooking";
import TermsPricing from "./TermsPricing";
import TermsPayments from "./TermsPayments";
import TermsCancellation from "./TermsCancellation";
import TermsItinerary from "./TermsItinerary";
import TermsAccommodation from "./TermsAccommodation";
import TermsTransportation from "./TermsTransportation";
import TermsTravellerResponsibilities from "./TermsTravellerResponsibilities";
import TermsDocuments from "./TermsDocuments";
import TermsWeather from "./TermsWeather";

import TermsThirdParty from "./TermsThirdParty";
import TermsLiability from "./TermsLiability";
import TermsForceMajeure from "./TermsForceMajeure";
import TermsIntellectualProperty from "./TermsIntellectualProperty";
import TermsChanges from "./TermsChanges";

import TermsContact from "./TermsContact";
import TermsCTA from "./TermsCTA";

export default function TermsPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <TermsHero />

      <TermsIntro />

      <TermsContents />

      {/* Core travel terms */}
      <TermsBooking />
      <TermsPricing />
      <TermsPayments />
      <TermsCancellation />
      <TermsItinerary />
      <TermsAccommodation />
      <TermsTransportation />
      <TermsTravellerResponsibilities />
      <TermsDocuments />
      <TermsWeather />

      {/* Legal & operational terms */}
      <TermsThirdParty />
      <TermsLiability />
      <TermsForceMajeure />
      <TermsIntellectualProperty />
      <TermsChanges />

      <TermsContact />

      <TermsCTA />
    </main>
  );
}