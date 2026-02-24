import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Shield, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

const navLinkBase =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const links = useMemo(
    () => [
      { to: '/', label: 'Overview' },
      { to: '/detect', label: 'Detector' },
      { to: '/architecture', label: 'Model' },
      { to: '/about', label: 'About' },
      { to: '/team', label: 'Team' },
    ],
    [],
  )

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 -z-10 bg-ink-900/60 backdrop-blur-xl" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/6 ring-1 ring-white/10 shadow-glass">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/18 via-fuchsia-500/10 to-sky-500/18 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
            <Shield className="relative h-5 w-5 text-white/85" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-wide text-white">
              Deepfake Guard
            </div>
            <div className="text-xs text-white/55">AI authenticity verification</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  navLinkBase,
                  isActive ? 'bg-white/8 text-white ring-1 ring-white/10' : 'text-white/70',
                )
              }
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/detect">
            <Button size="sm">Try the Detector</Button>
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-white/80 ring-1 ring-white/10 transition hover:bg-white/8 hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
              <div className="rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-xl">
                <div className="flex flex-col p-2">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          navLinkBase,
                          'px-4 py-3',
                          isActive ? 'bg-white/8 text-white' : 'text-white/70',
                        )
                      }
                      end={l.to === '/'}
                    >
                      {l.label}
                    </NavLink>
                  ))}
                  <div className="p-2">
                    <Link to="/detect" onClick={() => setOpen(false)}>
                      <Button className="w-full" size="md">
                        Try the Detector
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

