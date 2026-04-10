import * as React from "react"

import { cn } from "../../lib/utils"

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-[10px] border-0 bg-input px-4 py-3 text-base text-foreground outline-none placeholder:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
