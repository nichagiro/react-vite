import { z } from 'zod'

export const filtrosSchema = z.object({
  fechaInicio: z.string().min(1, "Campo Requerido"),
  fechaFin: z.string().min(1, "Campo Requerido"),
}).superRefine((data, ctx) => {
  if (data.fechaInicio && data.fechaFin && data.fechaInicio > data.fechaFin) {
    ctx.addIssue({
      code: 'custom',
      message: 'La fecha inicial debe ser anterior a la fecha final',
      path: ['fechaInicio'],
    })
    ctx.addIssue({
      code: 'custom',
      message: 'La fecha final debe ser posterior a la fecha final',
      path: ['fechaFin'],
    })
  }
})

export type FormValues = z.infer<typeof filtrosSchema>
