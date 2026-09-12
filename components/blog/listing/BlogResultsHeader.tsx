type Props = {
  count: number;
  search?: string;
  categoryName?: string;
};

export default function BlogResultsHeader({
  count,
  search,
  categoryName,
}: Props) {
  const trimmedSearch = search?.trim();

  let heading = "Latest stories";

  if (trimmedSearch) {
    heading = `Stories matching “${trimmedSearch}”`;
  } else if (categoryName) {
    heading = `${categoryName} stories`;
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
          The Journal
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#071A33] sm:text-3xl">
          {heading}
        </h2>
      </div>

      <p className="text-sm text-[#071A33]/45">
        {count} {count === 1 ? "story" : "stories"}
      </p>
    </div>
  );
}