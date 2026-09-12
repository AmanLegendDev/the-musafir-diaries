import type { Metadata } from "next";
import InquirySuccessContent from "./InquirySuccessContent";

export const metadata: Metadata = {
  title: "Inquiry Received | The Musafir Diaries",
  description:
    "Your travel inquiry has been received by The Musafir Diaries.",
  alternates: {
    canonical: "/inquiry/success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

interface InquirySuccessPageProps {
  searchParams: Promise<{
    id?: string;
  }>;
}

export default async function InquirySuccessPage({
  searchParams,
}: InquirySuccessPageProps) {
  const params = await searchParams;

  const inquiryId = params.id;

  if (!inquiryId) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF9F5] px-4">
        <div className="w-full max-w-md rounded-[2rem] border border-[#071A33]/8 bg-white p-7 text-center shadow-[0_18px_60px_rgba(7,26,51,0.06)]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F06A5B]">
            Missing reference
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-[#071A33]">
            No inquiry reference was provided.
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#071A33]/60">
            Please return to the inquiry page to start a new
            travel request.
          </p>

          <a
            href="/inquiry"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#071A33] px-5 text-sm font-semibold text-white transition hover:bg-[#0D2747]"
          >
            Start an inquiry
          </a>
        </div>
      </main>
    );
  }

  return (
    <InquirySuccessContent inquiryId={inquiryId} />
  );
}