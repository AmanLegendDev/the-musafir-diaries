export default function Loading() {
  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F5] px-6"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        {/* =================================================
            BRAND MARK
        ================================================== */}

        <div
          className="
            mb-7
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#071A33]
            shadow-[0_12px_35px_rgba(7,26,51,0.14)]
          "
          aria-hidden="true"
        >
          <span className="h-5 w-5 rounded-full border-[3px] border-[#FAF9F5]/30 border-t-[#1597C7] animate-spin" />
        </div>

        {/* =================================================
            BRAND
        ================================================== */}

        <p className="font-heading text-lg font-semibold tracking-tight text-[#071A33]">
          The Musafir Diaries
        </p>

        <p className="mt-1 text-sm text-[#071A33]/55">
          Preparing your journey…
        </p>

        {/* =================================================
            LOADING BAR
        ================================================== */}

        <div
          className="
            mt-6
            h-1
            w-40
            overflow-hidden
            rounded-full
            bg-[#071A33]/8
          "
          aria-hidden="true"
        >
          <div
            className="
              h-full
              w-1/2
              rounded-full
              bg-[#1597C7]
              animate-[loading_1.4s_ease-in-out_infinite]
            "
          />
        </div>
      </div>
    </main>
  );
}