import { SWRConfig } from 'swr'
import { request } from '../lib/request'

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: request,
        dedupingInterval: 5000,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onError: (error, key) => {
          console.log(`[SWR] ${key}: ${error.message}`)
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
