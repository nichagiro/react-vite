import { lazy } from 'react'

const Index = lazy(() => import('./pages/Home/Index').then(m => ({ default: m.Index })))

export const routes = [
  { path: '/', component: Index },
] as const
