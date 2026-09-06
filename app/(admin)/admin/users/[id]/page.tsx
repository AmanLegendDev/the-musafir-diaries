import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-5xl">

      <Link
        href="/admin/users"
        className="text-[#0F4C81]"
      >
        ← Back to Users
      </Link>

      <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold">
          Edit User
        </h1>

        <p className="mt-3 text-slate-500">
          User ID : {id}
        </p>

      </div>

    </div>
  );
}