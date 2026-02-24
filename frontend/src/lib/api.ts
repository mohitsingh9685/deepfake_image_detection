export type PredictResponse = {
  prediction: 'Real' | 'Fake' | string
  confidence: number
  raw_score?: number
}

export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8000'
}

export async function predictImage(file: File, signal?: AbortSignal): Promise<PredictResponse> {
  const form = new FormData()
  form.append('file', file)

  const res = await fetch(`${getApiBaseUrl().replace(/\/$/, '')}/predict`, {
    method: 'POST',
    body: form,
    signal,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed: ${res.status}`)
  }

  return (await res.json()) as PredictResponse
}

