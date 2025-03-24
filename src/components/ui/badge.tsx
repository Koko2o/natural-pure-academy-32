
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "text-foreground",
        natural:
          "border-transparent bg-natural-100 text-natural-800 hover:bg-natural-200",
        teal: 
          "border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200",
        amber: 
          "border-transparent bg-amber-100 text-amber-800 hover:bg-amber-200",
        sky: 
          "border-transparent bg-sky-100 text-sky-800 hover:bg-sky-200",
        rose: 
          "border-transparent bg-rose-100 text-rose-800 hover:bg-rose-200",
        highlight:
          "border-transparent bg-gradient-to-r from-teal-400 to-cyan-400 text-white font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
