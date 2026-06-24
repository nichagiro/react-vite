import { useFormContext, useFormState } from 'react-hook-form'
import { Input, Button, Panel } from '@nichagiro/ui-primitives'
import type { FormValues } from './schema'

export function Filtros() {
  const { register } = useFormContext<FormValues>()
  const { errors } = useFormState<FormValues>()

  return (
    <Panel title="Filtros" colorScheme="primary">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" >
        <Input
          isRequired
          label="Fecha Inicial"
          error={errors.fechaInicio?.message}
          type="date"
          {...register('fechaInicio')}
        />
        <Input
          isRequired
          label="Fecha Final"
          type="date"
          error={errors.fechaFin?.message}
          {...register('fechaFin')}
        />
        <div className="mt-2 items-center md:ps-4">
          <Button colorScheme='danger' type="submit">
            Buscar
          </Button>
        </div>
      </div>
    </Panel>
  )
}
