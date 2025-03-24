
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
        purple: 
          "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200",
        indigo: 
          "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
        condition: 
          "border-transparent bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-1 px-3",
        active: 
          "border-transparent bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
        stat: 
          "border-transparent bg-blue-50 text-blue-700 py-1",
        pill:
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-full px-3 py-1",
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
