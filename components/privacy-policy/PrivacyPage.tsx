import PrivacyHero from "./PrivacyHero";
import PrivacyIntro from "./PrivacyIntro";
import PrivacyContents from "./PrivacyContents";
import PrivacyInformation from "./PrivacyInformation";
import PrivacyUsage from "./PrivacyUsage";
import PrivacySharing from "./PrivacySharing";
import PrivacyTravelPartners from "./PrivacyTravelPartners";
import PrivacyPayments from "./PrivacyPayments";
import PrivacySecurity from "./PrivacySecurity";
import PrivacyRights from "./PrivacyRights";
import PrivacyCookies from "./PrivacyCookies";
import PrivacyThirdParty from "./PrivacyThirdParty";
import PrivacyUpdates from "./PrivacyUpdates";
import PrivacyContact from "./PrivacyContact";
import PrivacyCTA from "./PrivacyCTA";

export default function PrivacyPage() {
  return (
    <main className="overflow-x-hidden bg-white">
      <PrivacyHero />

      <PrivacyIntro />

      <PrivacyContents />

      <PrivacyInformation />

      <PrivacyUsage />

      <PrivacySharing />

      <PrivacyTravelPartners />

      <PrivacyPayments />

      <PrivacySecurity />

      <PrivacyRights />

      <PrivacyCookies />

      <PrivacyThirdParty />

      <PrivacyUpdates />

      <PrivacyContact />

      <PrivacyCTA />
    </main>
  );
}