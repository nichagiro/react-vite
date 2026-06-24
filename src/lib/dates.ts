import { format } from '@formkit/tempo'

export type DateInput = string | Date | null | undefined

const ISO = 'YYYY-MM-DD'
const FMT_DATE = 'DD/MM/YYYY'
const FMT_DATETIME = 'DD/MM/YYYY HH:ss'

export function fmtDate(d: DateInput): string {
  if (!d) return ''
  return format(d, FMT_DATE)
}

export function fmtDateTime(d: DateInput): string {
  if (!d) return ''
  return format(d, FMT_DATETIME)
}

export function todayStr(): string {
  return format(new Date(), FMT_DATE)
}

export function toISO(d: DateInput): string {
  if (!d) return ''
  return format(d, ISO)
}
