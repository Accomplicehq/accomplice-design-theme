import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

function Sheet(props) {
  return <DialogPrimitive.Root {...props} />
}

function SheetTrigger(props) {
  return <DialogPrimitive.Trigger {...props} />
}

function SheetPortal(props) {
  return <DialogPrimitive.Portal {...props} />
}

function SheetClose(props) {
  return <DialogPrimitive.Close {...props} />
}

function SheetOverlay({ className, ...props }) {
  return <DialogPrimitive.Overlay className={cn("fixed inset-0 z-50 bg-black/20", className)} {...props} />
}

function SheetContent({ className, children, side = "left", ...props }) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex h-full w-[220px] flex-col gap-6 bg-secondary px-4 py-6 sm:px-6",
          side === "left" && "inset-y-0 left-0",
          className
        )}
        {...props}
      >
        {children}
        <SheetClose className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

export { Sheet, SheetClose, SheetContent, SheetTrigger }
