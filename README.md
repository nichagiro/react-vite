# react-vite

Plantilla para SPA simples de 1 a 3 páginas con React 19, TypeScript strict, SWR + UI primitives.

## Stack

- **React 19** + **TypeScript** (strict) + **Vite 8**
- **Wouter** - router minimalista
- **@nichagiro/ui-primitives** - componentes UI
- **react-hook-form** + **Zod** - formularios
- **SWR** - data fetching + cache
- **@formkit/tempo** - fechas
- **Tailwind CSS v4** - estilos

## Scripts

```bash
pnpm dev        # Desarrollo
pnpm build      # Build producción
pnpm lint       # Oxlint
pnpm preview    # Preview build
pnpm doctor     # React Doctor
```

## Estructura

```
src/
  api/          # Endpoints HTTP por entidad
  components/   # Layout compartido
  hooks/        # Custom hooks (SWR)
  lib/          # Utilidades (request, dates)
  pages/        # 1 carpeta = 1 ruta
  providers/    # SWRConfig
  types/        # Tipos compartidos
  routes.ts     # Definición de rutas (lazy)
```

Ver `AGENTS.md` para convenciones detalladas.
