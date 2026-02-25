export type PredictResponse = {
  prediction: 'Real' | 'Fake' | string
  confidence: number
  raw_score?: number
}

export function getApiBaseUrl() {
  return ((import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8000').replace(
    /\/$/,
    '',
  )
}

export async function predictImage(file: File, signal?: AbortSignal): Promise<PredictResponse> {
  const form = new FormData()
  form.append('file', file)

  const endpoint = `${getApiBaseUrl()}/predict`

  let res: Response
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      body: form,
      signal,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }
    throw new Error(
      `Network error while calling ${endpoint}. Check CORS origins, backend availability, and HTTPS/HTTP mismatch.`,
    )
  }

  if (!res.ok) {
    const text = (await res.text().catch(() => '')).replace(/\s+/g, ' ').trim()
    const details = text ? `: ${text.slice(0, 160)}` : ''
    throw new Error(`Request failed (${res.status}) at ${endpoint}${details}`)
  }

  return (await res.json()) as PredictResponse
}

