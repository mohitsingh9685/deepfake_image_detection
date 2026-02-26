import { Linkedin, Sparkles } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'

const team = [
  {
    name: 'Dhruv Bansal',
    role: 'Full-Stack & System Architect',
    blurb: 'Designed and implemented the FastAPI backend and frontend integration, integrated the trained TensorFlow/Keras model into the API and deployed the complete system to production.',
    linkedin: 'https://www.linkedin.com/in/dhruvbansalup',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQHX8lo0PzRY1A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726396359432?e=1773878400&v=beta&t=Kiq2XPyBlssncU5f1NjD8abU2rlXeHO31zFv251mZiA',
  },
  {
    name: 'Mohit Singh',
    role: 'Model Training & Experimentation Lead',
    blurb: 'Led deep learning model training, experimentation, hyperparameter tuning, and performance optimization for deepfake image detection.',
    linkedin: 'https://www.linkedin.com/in/mohitsingh9685/',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQHUlOiGf5yigg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731178703831?e=1773878400&v=beta&t=Fba6HWhiv0TS10hsMXgRP6S_X6KKEr6A6DvTL3EPf60',
  },
  {
    name: 'Manas Dwivedi',
    role: 'Model Evaluation & Research Engineer',
    blurb: 'Handles experimentation, accuracy analysis, confusion matrix evaluation, performance benchmarking, and technical research documentation.',
    linkedin: 'https://www.linkedin.com/in/manas-dwivedi-a3bb7a328',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQG3qcwJS0wfcQ/profile-displayphoto-shrink_200_200/B4EZeuCmkEHsAY-/0/1750971608202?e=1773878400&v=beta&t=tSOWU6Z5-dKxiKouIuUqCkEOuSUdUsik55TESCIrlrc',
  },
  {
    name: 'Anurag Ranjan',
    role: 'Presentation & Communication Lead',
    blurb: 'Designed the project presentation, created architecture diagrams, organized demo flow, and structured result visualization.',
    linkedin: 'https://www.linkedin.com/in/anurag-ranjan-187357238',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQEJU-GI7fGQCQ/profile-displayphoto-scale_200_200/B4DZpSmagkIkAY-/0/1762322395257?e=1773878400&v=beta&t=nHAfhMV2DtfP-3qcqQq6aF2e5AGxYyZBhh4wOOCME9U',
  },
  {
    name: 'Shresth Rastogi',
    role: 'Technical Documentation Lead',
    blurb: 'Prepares project documentation, compiles research findings, and creates the final technical PDF report.',
    linkedin: 'https://www.linkedin.com/in/shresth-rastogi-03a560329',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E35AQEoFE2f0au3Cg/profile-framedphoto-shrink_200_200/B4EZiJgCjGHoAY-/0/1754653534877?e=1772658000&v=beta&t=aMG9LWweLfrC2DAjTis9JPyoCLJklv6qQAnq1gp-xcs',
  },
  {
    name: 'Ram Katara',
    role: 'Demo & Submission Coordinator',
    blurb: 'Handles demo video creation, final packaging, submission formatting, and supporting materials for evaluation.',
    linkedin: 'https://www.linkedin.com/in/ram-katara1115',
    avatar: 'https://media.licdn.com/dms/image/v2/D5635AQGYQQ0JvjiR_w/profile-framedphoto-shrink_200_200/B56ZUvEcHIHQAY-/0/1740251448404?e=1772658000&v=beta&t=DZgcPZTcEDH1thqo_FkonWNDCAW3IKzGg4BAnedF6gI',
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
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-30 w-30 overflow-hidden rounded-full bg-white/6 ring-2 ring-white/15 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/35 via-fuchsia-500/25 to-sky-500/30" />
                    <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(80%_80%_at_30%_20%,#000,transparent)] bg-white" />

                    <div className="relative grid h-full w-full place-items-center font-display text-lg font-semibold text-white">
                      {initials(m.name)}
                    </div>

                    <img
                      src={m.avatar}
                      alt={`${m.name} profile`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>

                  <div className="mt-4 min-w-0">
                    <div className="text-base font-semibold text-white">{m.name}</div>
                    <div className="mt-1 text-xs text-white/55">{m.role}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/65">{m.blurb}</p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs text-white/55">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI security focus
                  </div>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
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
