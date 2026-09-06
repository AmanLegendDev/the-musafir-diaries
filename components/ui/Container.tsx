import { ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-7xl",
      wide: "max-w-screen-2xl",
      full: "max-w-full",
    },
  },

  defaultVariants: {
    size: "default",
  },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
}

export function Container({
  children,
  className,
  size,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}