import { toast } from '@nichagiro/ui-primitives'
import { SWRConfig } from 'swr'
import { request } from '../lib/request'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: request.get,
        dedupingInterval: 5000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: true,
        errorRetryCount: 3,
        onError: (error) => toast.error(error.message)
      }}
    >
      {children}
    </SWRConfig>
  )
}
