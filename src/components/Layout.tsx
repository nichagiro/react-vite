import type { ReactNode } from 'react'
import { Toaster } from '@nichagiro/ui-primitives'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background)' }}>
      <h1 className='bg-primary text-center p-3 text-white font-bold text-2xl'>
        SPA NAME
      </h1>
      <main className='px-4 md:px-6 lg:px-8 py-4'>
        {children}
      </main>
      <Toaster />
    </div>
  )
}
