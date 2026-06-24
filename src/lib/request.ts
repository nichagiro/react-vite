import { toast } from '@nichagiro/ui-primitives'

type RequestOptions = Omit<RequestInit, 'body'> & {
  errorMessage?: string
  successMessage?: string
  body?: unknown
}

const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json' }

export async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { errorMessage, successMessage, headers, body, ...fetchOptions } = options

  const res = await fetch(url, {
    ...fetchOptions,
    headers: { ...defaultHeaders, ...headers },
    body: body != null ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    let apiMsg = res.statusText

    if (data && typeof data === 'object') {
      if ('error' in data && typeof data.error === 'string') {
        apiMsg = data.error
      }
    }

    if (res.status === 401) {
      apiMsg = 'No autorizado'
    }

    toast.error(errorMessage || apiMsg)
    throw new Error(apiMsg)
  }

  if (successMessage) toast.success(successMessage)

  return res.json()
}
