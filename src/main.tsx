import { createRoot } from 'react-dom/client'
import { z } from 'zod'
import './index.css'
import App from './App.tsx'

z.config(z.locales.es())

createRoot(document.getElementById('root')!).render(
  <App />
)
