
type Props = {
  count: number;
  hasFilters?: boolean;
};

export default function TestimonialResultsHeader({
  count,
  hasFilters = false,
}: Props) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
          Guest stories
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071A33] sm:text-3xl">
          Memories from the road
        </h2>
      </div>

      <p className="text-sm text-[#071A33]/45">
        {count} {count === 1 ? "story" : "stories"}
        {hasFilters ? " matching your filters" : ""}
      </p>
    </div>
  );
}