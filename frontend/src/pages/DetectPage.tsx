import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, CloudUpload, Loader2, ScanSearch, XCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { predictImage, type PredictResponse } from '../lib/api'
import { cn } from '../lib/cn'

type UiResult = {
  label: 'Real' | 'Fake'
  confidence: number // 0..1 (confidence of the label shown)
  rawScore: number // 0..1 (model probability)
  response: PredictResponse
}

function normalizeResult(r: PredictResponse): UiResult {
  const pred = String(r.prediction)
  const raw = typeof r.raw_score === 'number' ? r.raw_score : r.confidence
  const clipped = Number.isFinite(raw) ? Math.min(1, Math.max(0, raw)) : 0.5
  const label: 'Real' | 'Fake' = pred.toLowerCase().includes('fake') ? 'Fake' : 'Real'
  const confidence = label === 'Fake' ? clipped : 1 - clipped
  return { label, confidence, rawScore: clipped, response: r }
}

function formatPct(v: number) {
  return `${Math.round(v * 100)}%`
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const idx = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  const value = bytes / Math.pow(1024, idx)
  const digits = idx === 0 ? 0 : value >= 10 ? 1 : 2
  return `${value.toFixed(digits)} ${units[idx]}`
}

export function DetectPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<UiResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const statusTone = useMemo(() => {
    if (!result) return 'neutral' as const
    return result.label === 'Real' ? ('success' as const) : ('danger' as const)
  }, [result])

  async function onAnalyze() {
    if (!file || loading) return

    setError(null)
    setResult(null)
    setLoading(true)

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const res = await predictImage(file, controller.signal)
      setResult(normalizeResult(res))
    } catch (e) {
      if (controller.signal.aborted) return
      const message = e instanceof Error ? e.message : 'Failed to analyze image.'
      setError(message)
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }

  function onPick() {
    inputRef.current?.click()
  }

  function onReset() {
    controllerRef.current?.abort()
    setLoading(false)
    setError(null)
    setResult(null)
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  function acceptFile(f: File | null | undefined) {
    if (!f) return
    setError(null)
    setResult(null)
    setFile(f)
  }

  return (
    <div className="pb-24 pt-10 sm:pt-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Badge tone="info" className="mb-4">
            <ScanSearch className="h-3.5 w-3.5" />
            Deepfake Image Detector
          </Badge>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Analyze an image with startup-grade clarity
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Drag & drop an image, preview it instantly, and run AI inference to get a Real/Fake
            verdict with a confidence score.
          </p>
        </div>

        <Card glow className="mt-10 overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div
              className={cn(
                'relative rounded-2xl border border-dashed p-6 transition',
                'bg-white/[0.03] border-white/16',
                dragOver && 'bg-white/[0.06] border-white/30',
              )}
              role="button"
              tabIndex={0}
              aria-label="Upload image. Drag and drop or press Enter to browse."
              onClick={() => {
                if (!loading) onPick()
              }}
              onKeyDown={(e) => {
                if (loading) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onPick()
                }
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragOver(true)
              }}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragOver(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragOver(false)
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDragOver(false)
                const f = e.dataTransfer.files?.[0]
                acceptFile(f)
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => acceptFile(e.target.files?.[0])}
              />

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/6 ring-1 ring-white/10">
                  <CloudUpload className="h-6 w-6 text-white/80" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Drag & drop your image here
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    or browse a file from your device
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPick()
                    }}
                    disabled={loading}
                  >
                    Choose Image
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      onReset()
                    }}
                    disabled={!file && !loading}
                  >
                    Reset
                  </Button>
                </div>

                <AnimatePresence>
                  {previewUrl ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="mt-4 w-full"
                    >
                      <div className="mx-auto max-w-xl overflow-hidden rounded-2xl bg-white/4 ring-1 ring-white/10">
                        <img
                          src={previewUrl}
                          alt={file?.name ?? 'Selected image'}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                      <div className="mt-3 text-xs text-white/50">
                        {file?.name} • {formatBytes(file?.size ?? 0)}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-white/60">
                API endpoint: <span className="text-white/80">POST /predict</span>
              </div>
              <Button onClick={onAnalyze} disabled={!file || loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    Analyze
                    <ScanSearch className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <AnimatePresence>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                    <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.08),transparent)] bg-[length:200%_100%] animate-shimmer" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-white">AI Processing</div>
                        <div className="mt-1 text-xs text-white/55">
                          Extracting features · scoring authenticity · generating confidence
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/55">
                        <span className="h-2 w-2 rounded-full bg-indigo-300/80" />
                        Live inference
                      </div>
                    </div>
                    <div className="relative mt-4 h-2 rounded-full bg-white/8">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-sky-400/70 via-indigo-400/70 to-fuchsia-400/70"
                        initial={{ width: '15%' }}
                        animate={{ width: ['15%', '78%', '45%', '92%'] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {error ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6"
                >
                  <div className="rounded-2xl bg-rose-500/10 p-5 ring-1 ring-rose-400/20">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-200/90" />
                      <div>
                        <div className="text-sm font-semibold text-white">
                          Analysis failed
                        </div>
                        <div className="mt-1 text-sm text-white/65">{error}</div>
                        <div className="mt-3 text-xs text-white/55">
                          Tip: Ensure the backend is running on{' '}
                          <span className="text-white/75">http://localhost:8000</span> or set{' '}
                          <span className="text-white/75">VITE_API_BASE_URL</span>.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6"
                >
                  <div
                    className={cn(
                      'rounded-2xl p-5 ring-1',
                      result.label === 'Real'
                        ? 'bg-emerald-500/10 ring-emerald-400/20'
                        : 'bg-rose-500/10 ring-rose-400/20',
                    )}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {result.label === 'Real' ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-200/90" />
                          ) : (
                            <XCircle className="h-6 w-6 text-rose-200/90" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-semibold text-white">
                              Result: {result.label}
                            </div>
                            <Badge tone={statusTone}>
                              {result.label === 'Real' ? 'Authentic' : 'Manipulated'}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm text-white/65">
                            Confidence: <span className="text-white">{formatPct(result.confidence)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 sm:min-w-[260px]">
                        <div className="flex items-center justify-between text-xs text-white/55">
                          <span>Confidence score</span>
                          <span>{formatPct(result.confidence)}</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-white/10">
                          <div
                            className={cn(
                              'h-2 rounded-full',
                              result.label === 'Real'
                                ? 'bg-gradient-to-r from-emerald-400/70 via-sky-400/70 to-indigo-400/70'
                                : 'bg-gradient-to-r from-rose-400/70 via-fuchsia-400/70 to-indigo-400/70',
                            )}
                            style={{ width: `${Math.max(4, Math.round(result.confidence * 100))}%` }}
                          />
                        </div>
                        <div className="mt-2 text-[11px] text-white/45">
                          Raw model score: {Math.round(result.rawScore * 1000) / 1000}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

