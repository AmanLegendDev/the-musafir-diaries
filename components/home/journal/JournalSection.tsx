import JournalHeader from "./JournalHeader";
import JournalGrid, { type HomeJournal } from "./JournalGrid";

interface JournalSectionProps {
  posts: HomeJournal[];
}

export default function JournalSection({
  posts,
}: JournalSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section
      id="journal"
      aria-labelledby="journal-heading"
      className="relative overflow-hidden bg-[#FAF9F5] py-20 sm:py-24 lg:py-32"
    >
      {/* Ambient background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#087E8B]/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F59E0B]/5 blur-3xl"
      />

      {/* Editorial divider */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[#071A33]/10"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <JournalHeader />

        <div className="mt-12 sm:mt-14 lg:mt-16">
          <JournalGrid posts={posts} />
        </div>
      </div>
    </section>
  );
}