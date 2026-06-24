# Convenciones del proyecto

## Scope

Plantilla para SPA simples de **1 a 3 páginas**. Todas las páginas comparten el mismo `Layout` (sin navegación/menú). No se usa router anidado ni layouts múltiples.

- Agregar ruta nueva: `<Route path="/ruta" component={Page} />` en `App.tsx`
- Crear página nueva: `src/pages/MiPagina/MiPagina.tsx`
- Exportar componente: `export function MiPagina()`

## Stack
- **React 19** + **TypeScript** (strict) + **Vite 8**
- **Wouter** - router minimalista
- **@nichagiro/ui-primitives** - componentes UI
- **react-hook-form** - formularios
- **SWR** - data fetching + cache
- **@formkit/tempo** - fechas
- **Zod** - validación de esquemas
- **Tailwind CSS v4** - estilos

## Sistema de colores (ColorScheme)
Todos los componentes aceptan `colorScheme` con estos valores:
`'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'`

## Componentes UI

### Button `@nichagiro/ui-primitives`
```tsx
import { Button } from '@nichagiro/ui-primitives'

<Button variant="solid" colorScheme="primary" size="md" loading>Click</Button>
```
- `variant`: `'solid' | 'soft' | 'ghost'` (default: `'solid'`)
- `colorScheme`: `ColorScheme` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `loading`: `boolean` - muestra spinner
- Acepta todas las props de `ButtonHTMLAttributes`

### Alert `@nichagiro/ui-primitives`
```tsx
import { Alert } from '@nichagiro/ui-primitives'

<Alert variant="info" title="Título" dismissible>
  Mensaje
</Alert>
```
- `variant`: `'info' | 'success' | 'warning' | 'error'`
- `dismissible`: `boolean`

### Chip `@nichagiro/ui-primitives`
```tsx
import { Chip } from '@nichagiro/ui-primitives'

<Chip variant="primary" size="sm" onDismiss={() => {}}>Etiqueta</Chip>
```
- `variant`: `'default' | 'primary' | 'success' | 'warning' | 'error'`
- `size`: `'sm' | 'md'`
- `onDismiss` - callback para mostrar botón de cerrar

### Panel `@nichagiro/ui-primitives`
```tsx
import { Panel } from '@nichagiro/ui-primitives'

<Panel title="Título" colorScheme="primary">
  Contenido
</Panel>
```

### Modal `@nichagiro/ui-primitives`
```tsx
import { Modal } from '@nichagiro/ui-primitives'

<Modal open={isOpen} onClose={() => setOpen(false)} title="Título" size="md" footer={<Button>Ok</Button>}>
  Contenido
</Modal>
```
- `size`: `'sm' | 'md' | 'lg' | 'xl' | 'full'`
- `footer`: `ReactNode` - renderizado en el pie del modal

### DataTable `@nichagiro/ui-primitives`
```tsx
import { DataTable } from '@nichagiro/ui-primitives'
import type { Column } from '@nichagiro/ui-primitives'

const columns: Column<Tipo>[] = [
  { header: 'Nombre', key: 'name', sortable: true },
  { header: 'Acción', render: (row) => <Button>Editar</Button> },
]

<DataTable
  columns={columns}
  data={items}
  keyExtractor={(row) => row.id}
  searchable
  striped
  loading={false}
  emptyContent="Sin datos"
  toolbarActions={<Button>Nuevo</Button>}
/>
```
- `searchable`: activa búsqueda en tabla
- `striped`: filas alternadas
- `selection`: `'none' | 'single' | 'multiple'`
- `pageSize`: número de filas por página (la paginación es interna)
- `density`: `'default' | 'compact'`
- `toolbarActions`: acciones en toolbar superior

### Pagination `@nichagiro/ui-primitives`
```tsx
import { Pagination } from '@nichagiro/ui-primitives'

<Pagination
  page={1}
  totalPages={5}
  totalItems={50}
  startRecord={1}
  endRecord={10}
  onPageChange={(p) => setPage(p)}
/>
```
- Se usa externamente si no se usa la paginación interna del DataTable

### Toast `@nichagiro/ui-primitives`
```tsx
import { Toaster, toast } from '@nichagiro/ui-primitives'

// En el layout principal:
<Toaster />

// En cualquier lugar:
toast.success('Operación exitosa')
toast.error('Error')
toast.info('Info')
toast.warning('Advertencia')
```

## Formularios (react-hook-form)

> `@nichagiro/ui-primitives` expone `ref` en todos sus componentes (heredan de interfaces HTML nativas). No necesitan `Controller`, se usan directamente con `register`.

```tsx
import { useForm } from 'react-hook-form'
import { Input, Select, TextArea, Check, RadioGroup } from '@nichagiro/ui-primitives'

type FormValues = { name: string; role: string; terms: boolean }

const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
  defaultValues: { name: '', role: '' }
})

<form onSubmit={handleSubmit(onSubmit)}>
  <Input label="Nombre" isRequired error={errors.name?.message} {...register('name', { required: 'Requerido' })} />
  
  <Select label="Rol" isRequired placeholder="Seleccionar..." error={errors.role?.message} {...register('role', { required: 'Requerido' })}>
    <option value="admin">Admin</option>
    <option value="user">User</option>
  </Select>

  <TextArea label="Biografía" {...register('bio')} />

  <RadioGroup
    label="Género"
    orientation="horizontal"
    options={[
      { label: 'Masculino', value: 'male' },
      { label: 'Femenino', value: 'female' },
    ]}
    {...register('gender')}
  />

  <Check label="Acepto términos" {...register('terms')} />

  <Button type="submit">Enviar</Button>
</form>
```

Los componentes Input, Select, TextArea, Check, RadioGroup aceptan `error?: string` para mostrar validación.

### Componentes de formulario

- **Input**: `label`, `isRequired`, `error`, `colorScheme`
- **Select**: `label`, `isRequired`, `error`, `colorScheme`, `placeholder`, children como `<option>`
- **TextArea**: `label`, `isRequired`, `error`, `colorScheme`, `resize`
- **Check**: `label`, `isRequired`, `error`, `variant: 'checkbox' | 'switch'`, `colorScheme`
- **RadioGroup**: `label`, `isRequired`, `options: RadioOption[]`, `error`, `colorScheme`, `orientation: 'vertical' | 'horizontal'`
- **FileUpload**: `label`, `isRequired`, `error`, `colorScheme`, `maxSize`, `files`, `onFilesChange`

## Organización de archivos

```
src/
  main.tsx              # Entry point
  App.tsx               # Router + Layout
  index.css             # Estilos globales / custom properties
  api/                  # Endpoints HTTP por entidad
    url.ts              # Configuración base URL
    products.ts         # Endpoints de productos
  components/
    Layout.tsx          # Layout principal
  hooks/                # Custom hooks con lógica de estado
    useProducts.ts      # Hook SWR para CRUD de productos
  lib/                  # Utilidades transversales
    request.ts          # Helper genérico fetch + toast + errores
    dates.ts            # Funciones de formato de fechas
  pages/                # 1 carpeta = 1 ruta
    Home/
      Home.tsx          # FormProvider
      Filtros.tsx       # Filtros con useFormContext + register
      Resultados.tsx    # DataTable con useProducts
      schema.ts         # Esquema Zod con validación cross-field
  providers/
    SWRProvider.tsx     # Configuración global de SWR
  types/                # Tipos compartidos
    product.ts          # Product, CreateProductDTO
```

## Reglas de código

- No agregar comentarios a menos que sean necesarios para entender lógica compleja
- Usar `colorScheme` en los componentes UI para mantener consistencia visual
- Los formularios con react-hook-form + register
- Toast para notificaciones
- Los formularios con react-hook-form + register (sin Controller)
- Componentes de página van dentro de `pages/<NombrePagina>/` (no en `components/features/`)
- **No instalar librerías sin preguntar primero.** Si recomiendo una, debo pedir aprobación antes de instalarla.
- **Usar `pnpm`** para todas las instalaciones.
