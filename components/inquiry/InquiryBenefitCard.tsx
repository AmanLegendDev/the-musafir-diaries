import type { LucideIcon } from "lucide-react";

interface InquiryBenefitCardProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}

export default function InquiryBenefitCard({
  icon: Icon,
  eyebrow,
  title,
  description,
}: InquiryBenefitCardProps) {
  return (
    <article className="group rounded-[1.75rem] border border-[#071A33]/8 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,26,51,0.08)] sm:p-7">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E7F4F5] text-[#087E8B] transition duration-300 group-hover:bg-[#087E8B] group-hover:text-white">
        <Icon size={20} strokeWidth={1.7} />
      </div>

      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#087E8B]">
        {eyebrow}
      </p>

      <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight text-[#071A33]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#071A33]/60">
        {description}
      </p>
    </article>
  );
}