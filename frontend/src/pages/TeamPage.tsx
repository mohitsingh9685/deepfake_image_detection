import { Linkedin, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'

const team = [
  {
    name: 'Ava Chen',
    role: 'ML Engineer',
    blurb: 'Builds robust training pipelines and model evaluation for deepfake classification.',
  },
  {
    name: 'Noah Patel',
    role: 'Full‑Stack Engineer',
    blurb: 'Ships premium UX with a secure API integration and production-minded architecture.',
  },
  {
    name: 'Mia Rodriguez',
    role: 'Product & Security',
    blurb: 'Designs trustworthy workflows and interpretable confidence reporting for real teams.',
  },
] as const

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

export function TeamPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <SectionHeading
        eyebrow="Team"
        title="Built like a funded AI product"
        description="A minimal, high-trust experience with a startup-grade aesthetic."
      />

      <div className="mx-auto mt-10 max-w-5xl">
        <div className="grid gap-4 md:grid-cols-3">
          {team.map((m) => (
            <Card key={m.name} glow className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-white/6 ring-1 ring-white/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/20 to-sky-500/25" />
                    <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(80%_80%_at_30%_20%,#000,transparent)] bg-white" />
                    <div className="relative grid h-full w-full place-items-center font-display text-sm font-semibold text-white">
                      {initials(m.name)}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-white">{m.name}</div>
                    <div className="mt-0.5 text-xs text-white/55">{m.role}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/65">{m.blurb}</p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs text-white/55">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI security focus
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/6 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10 transition hover:bg-white/8 hover:text-white"
                    aria-label={`LinkedIn for ${m.name}`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    Connect
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

