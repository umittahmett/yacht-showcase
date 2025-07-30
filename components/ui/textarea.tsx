import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "p-[30px] py-6 placeholder:capitalize outline-none ring-0 duration-200 transition-all flex disabled:cursor-not-allowed disabled:opacity-50 min-h-20  rounded-[10px] bg-main-background text-primary placeholder:text-gray-100",
        className
      )}
      {...props}
    />
  );
}

export { Textarea }
