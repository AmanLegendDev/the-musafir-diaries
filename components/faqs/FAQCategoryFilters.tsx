"use client";

type Props = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

function formatCategory(category: string) {
  return category
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function FAQCategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: Props) {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        type="button"
        onClick={() => onCategoryChange("")}
        aria-pressed={activeCategory === ""}
        className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
          activeCategory === ""
            ? "bg-[#071A33] text-white"
            : "bg-white text-[#071A33]/55 hover:bg-[#087E8B]/7 hover:text-[#087E8B]"
        }`}
      >
        All questions
      </button>

      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={active}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-[#071A33] text-white"
                : "bg-white text-[#071A33]/55 hover:bg-[#087E8B]/7 hover:text-[#087E8B]"
            }`}
          >
            {formatCategory(category)}
          </button>
        );
      })}
    </div>
  );
}