import { cn } from '../../lib/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center rounded-full bg-white/6 px-3 py-1 text-xs font-medium text-white/70 ring-1 ring-white/10">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-white/70">{description}</p>
      ) : null}
    </div>
  )
}

