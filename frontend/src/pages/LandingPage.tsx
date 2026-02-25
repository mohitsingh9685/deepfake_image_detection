import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  ChartNoAxesCombined,
  Lock,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { DeepfakeModel } from '../components/visuals/DeepfakeModel'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export function LandingPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <section className="relative">
        <div className="absolute inset-x-0 -top-6 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="pt-8 sm:pt-12"
          >
            <Badge tone="info" className="mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Real-time image authenticity verification
            </Badge>

            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Detect Deepfakes with <span className="text-gradient">Advanced AI</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Upload an image, run analysis in seconds, and receive a premium confidence score
              designed for security teams, media workflows, and high-trust verification.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/detect">
                <Button size="lg">
                  Try the Detector
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#learn-more">
                <Button size="lg" variant="secondary">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/65">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-200/80" />
                Secure by default
              </div>
              <div className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-200/80" />
                Fast inference pipeline
              </div>
              <div className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-fuchsia-200/80" />
                Confidence-driven results
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-r from-indigo-500/18 via-fuchsia-500/10 to-sky-500/18 blur-2xl" />
            <DeepfakeModel />

          </motion.div>
        </div>
      </section>

      <section id="learn-more" className="mt-24">
        <SectionHeading
          eyebrow="Product capabilities"
          title="A premium detector built for trust"
          description="Minimal, fast, and security-forward—designed to fit modern AI workflows."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Zap className="h-5 w-5 text-sky-200/90" />,
              title: 'Real Time Prediction',
              desc: 'Low-latency inference with smooth UI feedback and crisp confidence reporting.',
            },
            {
              icon: <BrainCircuit className="h-5 w-5 text-indigo-200/90" />,
              title: 'EfficientNet Based Architecture',
              desc: 'Modern backbone tuned for robust feature extraction and transfer learning.',
            },
            {
              icon: <Lock className="h-5 w-5 text-fuchsia-200/90" />,
              title: 'Secure API Backend',
              desc: 'CORS-enabled prediction endpoint designed for clean integration workflows.',
            },
            {
              icon: <ShieldCheck className="h-5 w-5 text-emerald-200/90" />,
              title: 'High Accuracy Detection',
              desc: 'Confidence-first presentation optimized for decision making at a glance.',
            },
          ].map((f) => (
            <Card key={f.title} className="group">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 transition group-hover:bg-white/8">
                    {f.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{f.title}</div>
                    <div className="mt-1 text-sm leading-relaxed text-white/65">
                      {f.desc}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Workflow"
          title="Upload → AI Processing → Confidence Score"
          description="A simple path from image to decision—without noise."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: 'Upload Image',
              desc: 'Drag & drop or browse. Preview before analysis for full control.',
              icon: <ScanSearch className="h-5 w-5 text-sky-200/90" />,
            },
            {
              title: 'AI Processing',
              desc: 'EfficientNet feature extraction + classification for authenticity scoring.',
              icon: <BrainCircuit className="h-5 w-5 text-indigo-200/90" />,
            },
            {
              title: 'Result + Confidence',
              desc: 'Clear Real/Fake indicator with a premium confidence readout.',
              icon: <BadgeCheck className="h-5 w-5 text-fuchsia-200/90" />,
            },
          ].map((s, idx) => (
            <Card key={s.title} glow className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                    {s.icon}
                  </div>
                  <div className="text-sm font-semibold text-white">{s.title}</div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.desc}</p>

                {idx < 2 ? (
                  <div className="mt-6 hidden items-center gap-3 text-xs text-white/45 lg:flex">
                    <span className="h-px w-10 bg-gradient-to-r from-white/18 to-transparent" />
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Performance snapshot"
          title="Built for measurable outcomes"
          description="Key indicators presented with startup-grade clarity."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { label: 'Model Accuracy', value: '92.4%', icon: <ShieldCheck className="h-5 w-5" /> },
            { label: 'AUC Score', value: '0.96', icon: <ChartNoAxesCombined className="h-5 w-5" /> },
            { label: 'Dataset Size', value: '120k+', icon: <BrainCircuit className="h-5 w-5" /> },
          ].map((s) => (
            <Card key={s.label} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{s.label}</div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/6 text-white/80 ring-1 ring-white/10">
                    {s.icon}
                  </div>
                </div>
                <div className="mt-4 font-display text-4xl font-semibold text-white">
                  {s.value}
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/8">
                  <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-sky-400/70 via-indigo-400/70 to-fuchsia-400/70" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <Card glow className="overflow-hidden">
          <CardContent className="relative p-8 sm:p-10">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/18 via-fuchsia-500/10 to-sky-500/18" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Start verifying now
                </div>
                <div className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                  Ready to see the detector in action?
                </div>
                <div className="mt-2 text-sm leading-relaxed text-white/65">
                  Upload an image and get an instant Real/Fake verdict with confidence—designed
                  to feel like a funded AI security product.
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/detect">
                  <Button size="lg">
                    Try the demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/architecture">
                  <Button size="lg" variant="secondary">
                    View architecture
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

