import { cn } from '../../lib/cn'

export function Backdrop({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-ink-900" />

      <div className="absolute inset-0 bg-grid opacity-[0.22]" />

      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/35 via-fuchsia-500/20 to-sky-500/25 blur-3xl animate-pulseGlow" />

      <div className="absolute -left-40 top-40 h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-sky-500/20 via-indigo-500/18 to-fuchsia-500/24 blur-3xl animate-float" />

      <div className="absolute -right-44 top-64 h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-fuchsia-500/18 via-indigo-500/22 to-sky-500/18 blur-3xl animate-float [animation-delay:-3s]" />

      <div className="absolute inset-0 noise opacity-[0.08] mix-blend-overlay" />

      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ink-950/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink-950/80 to-transparent" />
    </div>
  )
}

