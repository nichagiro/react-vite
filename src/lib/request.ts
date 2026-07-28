type RequestOptions = Omit<RequestInit, 'body'> & {
  data?: unknown
}

const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json' }

async function extractErrorMessage(res: Response): Promise<string> {
  const data = await res.json().catch(() => null)

  if (res.status === 401) return 'No autorizado'
  if (!data || typeof data !== 'object') return 'Ha ocurrido un error'

  if ('error' in data && typeof data.error === 'object') {
    return data.error.description || data.error.message || data.error.detail
  }

  return data.message || data.error || data.detail || data.description || 'Ha ocurrido un error'
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { data, headers, ...fetchOptions } = options

  const res = await fetch(url, {
    ...fetchOptions,
    headers: { ...defaultHeaders, ...headers },
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!res.ok) throw new Error(await extractErrorMessage(res))

  return res.json()
}

request.get = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options })

request.post = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'POST' })

request.put = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'PUT' })

request.patch = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'PATCH' })

request.delete = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: 'DELETE' })

export { request }
