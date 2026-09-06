import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditDestinationPage({
  params,
}: Props) {

  const { id } = await params;

  return (
    <div className="mx-auto max-w-4xl">

      <Link
        href="/admin/destinations"
        className="text-[#0F4C81]"
      >
        ← Back to Destinations
      </Link>

      <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          Edit Destination
        </h1>

        <p className="mt-3 text-slate-500">
          Destination ID : {id}
        </p>

      </div>

    </div>
  );
}