import { ArrowRight, SearchX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <div className="mx-auto max-w-xl">
        <Card glow>
          <CardContent className="p-10 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
              <SearchX className="h-6 w-6 text-white/80" />
            </div>
            <div className="mt-5 font-display text-2xl font-semibold text-white">
              Page not found
            </div>
            <div className="mt-2 text-sm text-white/65">
              The page you’re looking for doesn’t exist. Head back to the overview or try the
              detector.
            </div>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/">
                <Button variant="secondary" size="lg">
                  Back to landing
                </Button>
              </Link>
              <Link to="/detect">
                <Button size="lg">
                  Try the Detector <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

