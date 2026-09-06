export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div>

        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back 👋
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="text-right">

          <h3 className="font-semibold">
            Administrator
          </h3>

          <p className="text-sm text-slate-500">
            admin@altitudeescapes.com
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F4C81] text-white">
          A
        </div>

      </div>
    
    </header>
  );
}