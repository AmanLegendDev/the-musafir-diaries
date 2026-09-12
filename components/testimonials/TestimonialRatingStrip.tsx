import { Star, UsersRound } from "lucide-react";

type RatingStripTestimonial = {
  rating: number;
};

type Props = {
  testimonials: RatingStripTestimonial[];
};

function getRatingSummary(testimonials: RatingStripTestimonial[]) {
  const validRatings = testimonials
    .map((item) => Number(item.rating))
    .filter(
      (rating) =>
        Number.isFinite(rating) &&
        rating >= 1 &&
        rating <= 5
    );

  if (!validRatings.length) {
    return {
      average: null,
      count: 0,
      distribution: [0, 0, 0, 0, 0],
    };
  }

  const total = validRatings.reduce(
    (sum, rating) => sum + rating,
    0
  );

  const distribution = [5, 4, 3, 2, 1].map(
    (rating) =>
      validRatings.filter(
        (value) => Math.round(value) === rating
      ).length
  );

  return {
    average: total / validRatings.length,
    count: validRatings.length,
    distribution,
  };
}

export default function TestimonialRatingStrip({
  testimonials,
}: Props) {
  const summary = getRatingSummary(testimonials);

  if (!summary.count || summary.average === null) {
    return null;
  }

  return (
    <section
      aria-label="Guest rating summary"
      className="border-y border-[#071A33]/8 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* Average */}
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#071A33] text-white">
              <Star
                className="h-7 w-7 fill-[#F59E0B] text-[#F59E0B]"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold tracking-[-0.05em] text-[#071A33]">
                  {summary.average.toFixed(1)}
                </span>

                <span className="text-sm text-[#071A33]/40">
                  / 5
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <div
                  className="flex gap-0.5"
                  aria-label={`${summary.average.toFixed(
                    1
                  )} out of 5 average rating`}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`h-3.5 w-3.5 ${
                        index <
                        Math.round(summary.average ?? 0)
                          ? "fill-[#F59E0B] text-[#F59E0B]"
                          : "text-[#071A33]/15"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-[#071A33]/45">
                  {summary.count}{" "}
                  {summary.count === 1
                    ? "guest story"
                    : "guest stories"}
                </span>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div className="grid gap-2.5">
            {summary.distribution.map(
              (count, index) => {
                const rating = 5 - index;
                const percentage =
                  summary.count > 0
                    ? (count / summary.count) * 100
                    : 0;

                return (
                  <div
                    key={rating}
                    className="flex items-center gap-3"
                  >
                    <span className="w-8 text-right text-xs font-medium text-[#071A33]/50">
                      {rating}★
                    </span>

                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#071A33]/7">
                      <div
                        className="h-full rounded-full bg-[#F59E0B] transition-all duration-700"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <span className="w-6 text-xs text-[#071A33]/35">
                      {count}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}