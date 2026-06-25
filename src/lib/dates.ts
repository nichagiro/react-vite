import { format } from '@formkit/tempo'

export type DateInput = string | Date | null | undefined

const ISO = 'YYYY-MM-DD'
const FMT_DATE = 'DD/MM/YYYY'
const FMT_DATETIME = 'DD/MM/YYYY HH:ss'

export function formatDate(d: DateInput): string {
  if (!d) return ''
  return format(d, FMT_DATE)
}

export function formatDateTime(d: DateInput): string {
  if (!d) return ''
  return format(d, FMT_DATETIME)
}

export function getToday(): string {
  return format(new Date(), FMT_DATE)
}

export function toISODate(d: DateInput): string {
  if (!d) return ''
  return format(d, ISO)
}
