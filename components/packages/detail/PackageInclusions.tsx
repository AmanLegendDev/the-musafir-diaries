import {
  Check,
  Minus,
  Users,
} from "lucide-react";

interface ChildPolicy {
  complimentaryBelow: number;
  halfPriceBelow: number;
  halfPricePercentage: number;
}

interface PackageInclusionsProps {
  included: string[];
  excluded: string[];
  childPolicy?: ChildPolicy;
}

export default function PackageInclusions({
  included,
  excluded,
  childPolicy,
}: PackageInclusionsProps) {
  const hasContent =
    included?.length ||
    excluded?.length ||
    childPolicy;

  if (!hasContent) return null;

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#1597C7]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087E8B]">
              Good to know
            </span>
          </div>

          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1] tracking-[-0.04em] text-[#071A33] sm:text-5xl">
            What’s part of the journey.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Included */}
          {included?.length > 0 && (
            <div className="rounded-[28px] border border-[#087E8B]/15 bg-[#087E8B]/[0.035] p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#087E8B]/10">
                  <Check
                    className="h-4 w-4 text-[#087E8B]"
                    strokeWidth={1.8}
                  />
                </span>

                <h3 className="font-serif text-2xl text-[#071A33]">
                  Included
                </h3>
              </div>

              <div className="mt-7 space-y-4">
                {included.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-[#087E8B]"
                      strokeWidth={1.9}
                    />

                    <p className="text-sm leading-6 text-[#071A33]/60">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Excluded */}
          {excluded?.length > 0 && (
            <div className="rounded-[28px] border border-[#071A33]/8 bg-[#FAF9F5] p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071A33]/5">
                  <Minus
                    className="h-4 w-4 text-[#071A33]/50"
                    strokeWidth={1.8}
                  />
                </span>

                <h3 className="font-serif text-2xl text-[#071A33]">
                  Not included
                </h3>
              </div>

              <div className="mt-7 space-y-4">
                {excluded.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <Minus
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-[#071A33]/35"
                      strokeWidth={1.9}
                    />

                    <p className="text-sm leading-6 text-[#071A33]/55">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Child policy */}
        {childPolicy && (
          <div className="mt-6 rounded-[28px] border border-[#071A33]/8 bg-[#FAF9F5] p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F59E0B]/10">
                  <Users
                    className="h-4 w-4 text-[#F59E0B]"
                    strokeWidth={1.7}
                  />
                </span>

                <div>
                  <h3 className="font-serif text-xl text-[#071A33]">
                    Child policy
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#071A33]/40">
                    Pricing guidance for children travelling
                    with the group.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:text-right">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#071A33]/30">
                    Complimentary
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#071A33]">
                    Below {childPolicy.complimentaryBelow}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#071A33]/30">
                    Half price
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#071A33]">
                    Below {childPolicy.halfPriceBelow}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#071A33]/30">
                    Percentage
                  </p>

                  <p className="mt-1 text-sm font-medium text-[#071A33]">
                    {childPolicy.halfPricePercentage}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}