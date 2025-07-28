import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer font-[Unna] inline-flex active:scale-95 items-center justify-center gap-2 whitespace-nowrap text-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-secondary",
        white: "bg-white text-accent",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary hover:bg-accent text-white",
        danger: "bg-red-600 text-white shadow-sm hover:bg-red-800",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-accent !p-0 !h-fit",
      },
      size: {
        default: "h-10 sm:h-11 lg:h-[50px] px-6 sm:px-7 lg:px-[30px]",
        lg: "h-12 sm:h-14 lg:h-[60px] px-8 sm:px-9 lg:px-10",
        icon: "size-10 sm:size-11 lg:size-[50px]",
        iconSmall: '!size-8',
        iconXl:'size-16 sm:size-20 lg:size-[100px]'
      },
      radius: {
        default: 'rounded-full',
        md: 'rounded-[10px]'
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      radius: "default"
    },
  }
);

function Button({
  className,
  variant,
  size,
  radius,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, radius, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
