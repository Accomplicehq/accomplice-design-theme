import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-normal transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "rounded-full bg-primary text-primary-foreground hover:bg-[var(--brand-strong)]",
        secondary: "rounded-full bg-secondary text-foreground hover:bg-accent",
        ghost: "text-foreground hover:text-primary",
        field: "h-11 w-full justify-between rounded-[10px] bg-input px-4 text-sm text-foreground hover:bg-input",
        nav: "h-auto justify-start rounded-none px-0 py-2 text-sm text-foreground hover:bg-transparent hover:text-primary"
      },
      size: {
        default: "preview-button-copy",
        field: "",
        icon: "size-10 rounded-full p-0",
        nav: "text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
