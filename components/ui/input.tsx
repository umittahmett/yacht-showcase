import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "placeholder:capitalize outline-none border-input bg-background ring-0 duration-200 transition-all py-3 flex disabled:cursor-not-allowed disabled:opacity-50 border border-neutral-200",
  {
    variants: {
      variant: {
        default: "rounded-[10px] text-primary",
      },
      size: {
        default: "h-10 lg:h-11 px-4 text-sm",
        lg: "h-[60px] px-[30px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Input({
  className,
  variant,
  size,
  type,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
