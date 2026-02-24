import { Github, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-white/70">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10">
              <Shield className="h-4 w-4" />
            </span>
            <div className="text-sm">
              <div className="font-display font-semibold text-white">Deepfake Guard</div>
              <div className="text-xs text-white/55">
                Premium AI verification experience
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/detect"
              className="rounded-xl bg-white/6 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 transition hover:bg-white/8 hover:text-white"
            >
              Try the demo
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/6 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 transition hover:bg-white/8 hover:text-white"
            >
              <Github className="h-4 w-4" />
              Repository
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/45">
          © {new Date().getFullYear()} Deepfake Guard. Built for trustworthy media.
        </div>
      </div>
    </footer>
  )
}

