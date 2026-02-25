import { motion } from 'framer-motion'
import { ArrowRight, BrainCircuit, Layers, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Badge } from '../components/ui/Badge'

const blocks = [
  { title: 'Input Image', desc: 'RGB image normalized for inference', icon: Sparkles },
  { title: 'Data Augmentation', desc: 'Robustness transforms during training', icon: Layers },
  { title: 'EfficientNetB0', desc: 'Feature extraction backbone', icon: BrainCircuit },
  { title: 'Global Avg Pooling', desc: 'Spatial aggregation into embedding', icon: Layers },
  { title: 'Dense Layer', desc: 'Compact classifier head', icon: BrainCircuit },
  { title: 'Sigmoid Output', desc: 'Probability score (0–1)', icon: Sparkles },
] as const

export function ArchitecturePage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <SectionHeading
        eyebrow="Model Architecture"
        title="A sleek inference pipeline built for trust"
        description="From image ingest to confidence scoring, each stage is optimized for accuracy, speed, and clear decision support."
      />

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Backbone', value: 'EfficientNetB0' },
            { label: 'Output', value: 'Sigmoid (0-1)' },
            { label: 'Goal', value: 'Real/Fake Confidence' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10"
            >
              <div className="text-[11px] uppercase tracking-wide text-white/45">{item.label}</div>
              <div className="mt-1 text-sm font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <Card glow className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-sky-500/10" />
          <CardContent className="p-6 sm:p-8">
            <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
              <Badge tone="info">Input → Augmentation → EfficientNet → Score</Badge>
              <div className="text-xs text-white/55">Architecture map (conceptual)</div>
            </div>

            <div className="relative grid gap-4">
              {blocks.map((b, idx) => {
                const Icon = b.icon
                return (
                  <div key={b.title} className="relative">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.03 }}
                      className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.06]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                          <Icon className="h-5 w-5 text-white/85" />
                        </div>
                        <div className="min-w-0">
                          <div className="mb-1 inline-flex items-center gap-2 rounded-lg bg-white/6 px-2 py-1 text-[11px] text-white/65 ring-1 ring-white/10">
                            Stage {idx + 1}
                          </div>
                          <div className="text-sm font-semibold text-white">{b.title}</div>
                          <div className="mt-1 text-sm text-white/65">{b.desc}</div>
                        </div>
                      </div>
                    </motion.div>

                    {idx < blocks.length - 1 ? (
                      <div className="pointer-events-none relative mx-auto my-2 flex w-full max-w-md items-center justify-center">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 10, opacity: 1 }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                          }}
                          className="absolute"
                        >
                          <ArrowRight className="h-4 w-4 text-white/60" />
                        </motion.div>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-xl bg-white/6 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10">
                <BrainCircuit className="h-3.5 w-3.5" />
                Backbone rationale
              </div>
              <div className="text-sm font-semibold text-white">Why EfficientNet?</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                EfficientNet offers strong accuracy-to-latency tradeoffs, enabling fast inference
                while preserving feature quality—ideal for a responsive detector UI.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-xl bg-white/6 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10">
                <Sparkles className="h-3.5 w-3.5" />
                Decision clarity
              </div>
              <div className="text-sm font-semibold text-white">Output interpretation</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                The sigmoid output yields a probability score. The platform translates it into a
                clear Real/Fake label plus a confidence score for decision-ready clarity.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

