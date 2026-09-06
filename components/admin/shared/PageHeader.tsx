import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function PageHeader({
  title,
  description,
  buttonText,
  buttonHref,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {description}
        </p>
      </div>

      {buttonText && buttonHref && (
        <Link
          href={buttonHref}
          className="rounded-xl bg-[#0F4C81] px-5 py-3 font-semibold text-white transition hover:bg-[#0c3c65]"
        >
          + {buttonText}
        </Link>
      )}
    </div>
  );
}