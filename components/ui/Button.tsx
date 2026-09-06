import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0F4C81] text-white hover:bg-[#0c3d67]",

        secondary:
          "bg-slate-100 hover:bg-slate-200 text-slate-900",

        outline:
          "border border-slate-300 hover:bg-slate-100",

        ghost:
          "hover:bg-slate-100",

        destructive:
          "bg-red-600 text-white hover:bg-red-700",

        link:
          "text-[#0F4C81] underline-offset-4 hover:underline",
      },

      size: {
        sm: "h-9 px-3",

        md: "h-11 px-5",

        lg: "h-12 px-7",

        xl: "h-14 px-8 text-lg",

        icon: "h-11 w-11",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    />
  );
}