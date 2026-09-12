import type { ReactNode } from "react";

interface InquiryFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}

export default function InquiryField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
}: InquiryFieldProps) {
  return (
    <div className="min-w-0 space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-sm font-semibold text-[#071A33]"
        >
          {label}
          {required && (
            <span className="ml-1 text-[#F06A5B]" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {hint && (
          <span className="text-xs text-[#071A33]/50">
            {hint}
          </span>
        )}
      </div>

      {children}

      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-[#C94F43]"
        >
          {error}
        </p>
      )}
    </div>
  );
}