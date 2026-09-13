export default function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[1600px] animate-pulse space-y-8 pb-10">
      <div className="h-[260px] rounded-[30px] bg-slate-200" />

      <div>
        <div className="mb-5 h-8 w-56 rounded-lg bg-slate-200" />

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-[310px] rounded-[28px] bg-slate-200" />
          <div className="h-[310px] rounded-[28px] bg-slate-200" />
        </div>
      </div>

      <div>
        <div className="mb-5 h-8 w-64 rounded-lg bg-slate-200" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 7 }).map(
            (_, index) => (
              <div
                key={index}
                className="h-[205px] rounded-[24px] bg-slate-200"
              />
            ),
          )}
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="h-[420px] rounded-[28px] bg-slate-200" />
        <div className="h-[420px] rounded-[28px] bg-slate-200" />
      </div>
    </div>
  );
}