import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full text-sm placeholder:capitalize text-neutral-900 border border-gray-300 px-4 outline-none ring-0 focus:ring-2 focus:ring-sky-600 duration-200 transition-all py-3 flex rounded-lg bg-transparent shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
