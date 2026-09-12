import {
  Calculator,
} from "lucide-react";

interface BookingPriceCardProps {
  adults: number;
  children: number;
  adultTotal: number;
  childTotal: number;
  total: number;
}

export default function BookingPriceCard({
  adults,
  children,
  adultTotal,
  childTotal,
  total,
}: BookingPriceCardProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#071A33]/10">
      <div className="bg-[#071A33] p-5 text-white sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#7FD8DE]">
            <Calculator size={17} />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7FD8DE]">
              Current estimate
            </p>

            <h3 className="mt-1 text-base font-semibold">
              Journey estimate
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#071A33]">
                Adults
              </p>

              <p className="mt-0.5 text-xs text-[#071A33]/40">
                {adults}{" "}
                {adults === 1
                  ? "traveller"
                  : "travellers"}
              </p>
            </div>

            <p className="text-sm font-semibold text-[#071A33]">
              ₹
              {adultTotal.toLocaleString(
                "en-IN",
              )}
            </p>
          </div>

          {children > 0 && (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#071A33]">
                  Children
                </p>

                <p className="mt-0.5 text-xs text-[#071A33]/40">
                  {children}{" "}
                  {children === 1
                    ? "child"
                    : "children"}
                </p>
              </div>

              <p className="text-sm font-semibold text-[#071A33]">
                ₹
                {childTotal.toLocaleString(
                  "en-IN",
                )}
              </p>
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-[#071A33]/10 pt-5">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#087E8B]">
                Estimated total
              </p>

              <p className="mt-1 text-xs text-[#071A33]/40">
                Subject to final confirmation
              </p>
            </div>

            <p className="text-2xl font-semibold tracking-tight text-[#071A33]">
              ₹
              {total.toLocaleString(
                "en-IN",
              )}
            </p>
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-[#FAF9F5] px-4 py-3 text-xs leading-5 text-[#071A33]/45">
          The estimate is calculated from the
          selected package and traveller details.
          Final pricing is verified before your
          booking is confirmed.
        </p>
      </div>
    </div>
  );
}