import * as React from 'react'
import { cn } from '../../lib/cn'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: boolean
}

export function Card({ className, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl bg-white/[0.06] ring-1 ring-white/[0.10] shadow-glass',
        'backdrop-blur-xl',
        glow && 'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:opacity-70 before:blur-2xl before:bg-gradient-to-r before:from-indigo-500/20 before:via-fuchsia-500/15 before:to-sky-500/20',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-0', className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6', className)} {...props} />
}

