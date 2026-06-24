import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { filtrosSchema } from './schema'
import type { FormValues } from './schema'
import { Filtros } from './Filtros'
import { Resultados } from './Resultados'

export function Index() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(filtrosSchema),
    defaultValues: { fechaInicio: '', fechaFin: '' },
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <Filtros />
        <div className="my-5" />
        <Resultados />
      </form>
    </FormProvider>
  )
}
