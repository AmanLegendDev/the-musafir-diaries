import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InquiryDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl">

      <Link
        href="/admin/inquiries"
        className="text-[#0F4C81]"
      >
        ← Back to Inquiries
      </Link>

      <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          Inquiry Details
        </h1>

        <p className="mt-3 text-slate-500">
          Inquiry ID : {id}
        </p>

        <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Inquiry details will appear here.
        </div>

      </div>

    </div>
  );
}