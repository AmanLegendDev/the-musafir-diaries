import {
  CalendarDays,
  MapPin,
  MessageSquareText,
  Users,
} from "lucide-react";

interface InquirySummaryProps {
  destination: string;
  travelDate: string;
  travelers: number;
  pickupLocation: string;
  message: string;
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function InquirySummary({
  destination,
  travelDate,
  travelers,
  pickupLocation,
  message,
}: InquirySummaryProps) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] border border-[#071A33]/8 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
              Your travel brief
            </p>

            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#071A33] sm:text-3xl">
              What you shared with us
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={MapPin}
                label="Destination"
                value={destination || "Not available"}
              />

              <InfoItem
                icon={CalendarDays}
                label="Travel date"
                value={formatDate(travelDate)}
              />

              <InfoItem
                icon={Users}
                label="Travellers"
                value={`${travelers} ${
                  travelers === 1
                    ? "traveller"
                    : "travellers"
                }`}
              />

              <InfoItem
                icon={MapPin}
                label="Pickup"
                value={pickupLocation || "Not specified"}
              />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#071A33]/8 bg-[#F7F6F1] p-6 sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#087E8B]">
              <MessageSquareText size={18} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
              Your note
            </p>

            <p className="mt-4 text-sm leading-7 text-[#071A33]/65">
              {message || "No additional note provided."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#071A33]/7 bg-[#FAF9F5] p-4">
      <div className="flex items-center gap-2 text-[#087E8B]">
        <Icon size={16} strokeWidth={1.8} />

        <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold leading-6 text-[#071A33]">
        {value}
      </p>
    </div>
  );
}