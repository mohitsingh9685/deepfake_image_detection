import * as React from 'react'
import { cn } from '../../lib/cn'

export type BadgeTone = 'neutral' | 'success' | 'danger' | 'info'

const toneStyles: Record<BadgeTone, string> = {
  neutral: 'bg-white/8 text-white/80 ring-white/12',
  info: 'bg-sky-500/12 text-sky-200 ring-sky-400/20',
  success: 'bg-emerald-500/12 text-emerald-200 ring-emerald-400/20',
  danger: 'bg-rose-500/12 text-rose-200 ring-rose-400/20',
}

export function Badge({
  className,
  tone = 'neutral',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 backdrop-blur',
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  )
}

