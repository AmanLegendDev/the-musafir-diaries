export default function DashboardPage() {
  const stats = [
    {
      title: "Total Packages",
      value: "24",
      color: "from-blue-600 to-sky-500",
    },
    {
      title: "Destinations",
      value: "18",
      color: "from-emerald-600 to-green-500",
    },
    {
      title: "Bookings",
      value: "12",
      color: "from-orange-500 to-amber-400",
    },
    {
      title: "Blogs",
      value: "6",
      color: "from-violet-600 to-fuchsia-500",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-gradient-to-r from-[#0F4C81] via-sky-600 to-cyan-500 p-10 text-white shadow-2xl">
        <h1 className="text-5xl font-extrabold">
          Dashboard Overview
        </h1>

        <p className="mt-3 text-lg text-sky-100">
          Welcome back, Administrator 👋
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group overflow-hidden rounded-3xl bg-white shadow-2xl transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(15,76,129,0.25)]"
          >
            <div
              className={`h-3 bg-gradient-to-r ${item.color}`}
            />

            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                {item.title}
              </p>

              <h2 className="mt-6 text-6xl font-black text-slate-900">
                {item.value}
              </h2>

              <div className="mt-8 h-2 rounded-full bg-slate-100">
                <div
                  className={`h-full w-2/3 rounded-full bg-gradient-to-r ${item.color}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}