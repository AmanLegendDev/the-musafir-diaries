type Props = {
  count: number;
  hasFilters?: boolean;
};

export default function FAQResultsHeader({
  count,
  hasFilters = false,
}: Props) {
  return (
    <div className="flex flex-col gap-2 border-b border-[#071A33]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
          Your questions
        </p>

        <h2 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.03em] text-[#071A33] sm:text-3xl">
          What would you like to know?
        </h2>
      </div>

      <p className="text-sm text-[#071A33]/40">
        {count} {count === 1 ? "question" : "questions"}
        {hasFilters ? " found" : ""}
      </p>
    </div>
  );
}