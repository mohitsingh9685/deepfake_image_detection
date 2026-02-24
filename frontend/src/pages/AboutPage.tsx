import { ShieldCheck, Sparkles, TriangleAlert } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'

export function AboutPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <SectionHeading
        eyebrow="About"
        title="Trust is the new perimeter"
        description="Deepfakes are accelerating. Detection needs to be fast, reliable, and easy to interpret."
      />

      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        <Card glow>
          <CardContent className="p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                <TriangleAlert className="h-6 w-6 text-rose-200/90" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-xl font-semibold text-white">
                  The deepfake threat is real
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Synthetic media can undermine brand trust, manipulate public perception, and
                  bypass traditional verification workflows. As generative models improve, the
                  cost of fabrication drops—while the impact of a single successful deepfake
                  continues to rise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4 text-sky-200/90" />
                AI-assisted verification
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                This platform provides a focused, premium interface for image authenticity
                verification. Upload an image and get a Real/Fake verdict with a confidence
                score—optimized for clarity and decision-making.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-7">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-indigo-200/90" />
                Built for trust & usability
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Minimal UI, clean spacing, and subtle motion help teams move quickly without
                sacrificing confidence. The goal is a startup-grade product feel—not a demo
                dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

