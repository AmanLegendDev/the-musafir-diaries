import AboutHero from "./AboutHero";
import AboutIntro from "./AboutIntro";
import AboutStory from "./AboutStory";
import AboutValues from "./AboutValues";
import AboutJourney from "./AboutJourney";
import AboutExperience from "./AboutExperience";
import AboutDifference from "./AboutDifference";
import AboutVision from "./AboutVision";
import AboutTrust from "./AboutTrust";
import AboutFAQ from "./AboutFAQ";
import AboutCTA from "./AboutCTA";

import type { AboutFAQ as AboutFAQData } from "@/lib/queries/about.queries";

type Props = {
  faqs?: AboutFAQData[];
};

export default function AboutPage({ faqs = [] }: Props) {
  return (
    <main className="overflow-x-hidden bg-white">
      <AboutHero />

      <AboutIntro />

      <AboutStory />

      <AboutValues />

      <AboutJourney />

      <AboutExperience />

      <AboutDifference />

      <AboutVision />

      <AboutTrust />

      <AboutFAQ faqs={faqs} />

      <AboutCTA />
    </main>
  );
}