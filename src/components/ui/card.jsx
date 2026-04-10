import * as React from "react"

import { cn } from "../../lib/utils"

function Card({ className, ...props }) {
  return <div className={cn("rounded-[10px] bg-card p-5", className)} {...props} />
}

function CardHeader({ className, ...props }) {
  return <div className={cn("space-y-2", className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-base font-normal text-foreground", className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return <p className={cn("text-base leading-[1.5] text-muted-foreground", className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={cn("space-y-3", className)} {...props} />
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle }
