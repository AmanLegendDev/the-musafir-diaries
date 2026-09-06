import * as React from "react";

import { cn } from "@/utils/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full rounded-lg border border-slate-300 bg-white p-4 text-sm outline-none transition focus:border-[#0F4C81]",
        className
      )}
      {...props}
    />
  );
}