import { ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const sectionVariants = cva("", {
  variants: {
    spacing: {
      none: "",

      sm: "py-10",

      md: "py-16",

      lg: "py-24",

      xl: "py-32",
    },

    background: {
      transparent: "",

      white: "bg-white",

      muted: "bg-slate-50",

      primary: "bg-[#0F4C81] text-white",
    },
  },

  defaultVariants: {
    spacing: "lg",
    background: "transparent",
  },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: ReactNode;
}

export function Section({
  children,
  className,
  spacing,
  background,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        sectionVariants({
          spacing,
          background,
        }),
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}