import PrivacySection from "./PrivacySection";
import { Cookie, Settings2, BarChart3 } from "lucide-react";

const COOKIE_TYPES = [
  {
    icon: Cookie,
    title: "Essential technologies",
    text: "Some technologies may be necessary for the website to function properly, maintain security or remember basic preferences.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    text: "Where analytics tools are used, they may help us understand website usage and improve the experience. The specific tools in use may change over time.",
  },
  {
    icon: Settings2,
    title: "Your choices",
    text: "Depending on the technologies and settings available on the website, you may be able to manage certain cookies or similar technologies through your browser or provided controls.",
  },
];

export default function PrivacyCookies() {
  return (
    <PrivacySection
      id="cookies"
      number="08"
      title="Cookies & Similar Technologies"
      intro="Our website may use cookies or similar technologies to support functionality, understand website usage and improve the experience."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {COOKIE_TYPES.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#087E8B]/20 bg-[#087E8B]/5 text-[#087E8B]">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="mt-5 font-serif text-xl tracking-[-0.02em] text-[#071A33]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#071A33]/50">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
        The exact cookies, analytics services and other technologies
        used on the website may change as the website develops.
        This policy should therefore be reviewed and updated when
        new tracking or analytics tools are introduced.
      </p>
    </PrivacySection>
  );
}