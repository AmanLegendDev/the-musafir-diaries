import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl",
      h2: "scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight lg:text-4xl",

      lead: "text-xl text-slate-600 leading-8",

      body: "text-base leading-7 text-slate-700",

      small: "text-sm leading-6",

      muted: "text-sm text-slate-500",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },

  defaultVariants: {
    variant: "body",
    align: "left",
  },
});

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "span";

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
}

export function Typography({
  as,
  variant,
  align,
  className,
  ...props
}: TypographyProps) {
  const Component =
    as ??
    (variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : "p");

  return (
    <Component
      className={cn(
        typographyVariants({
          variant,
          align,
        }),
        className
      )}
      {...props}
    />
  );
}