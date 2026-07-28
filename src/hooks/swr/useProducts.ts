import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useSWRConfig } from 'swr'
import { request } from '../../lib/request'
import { API_URL } from '../../config'
import type { CreateProductPayload, Product, UpdateProductPayload } from '../../types/product'

const BASE_URL = `${API_URL}/products`

export function useProducts() {
  const swr = useSWR<Product[]>(BASE_URL)
  return { ...swr, data: swr.data ?? [] }
}

export function useCreateProduct() {
  const { mutate } = useSWRConfig()
  return useSWRMutation(
    BASE_URL,
    async (url, { arg }: { arg: CreateProductPayload }) =>
      request.post<Product>(url, { data: arg }),
    { onSuccess: () => mutate(BASE_URL) },
  )
}

export function useUpdateProduct() {
  const { mutate } = useSWRConfig()
  return useSWRMutation(
    BASE_URL,
    async (url, { arg }: { arg: UpdateProductPayload }) =>
      request.patch<Product>(`${url}/${arg.id}`, { data: arg.data }),
    { onSuccess: () => mutate(BASE_URL) },
  )
}

export function useDeleteProduct() {
  const { mutate } = useSWRConfig()
  return useSWRMutation(
    BASE_URL,
    async (url, { arg }: { arg: number }) =>
      request.delete<boolean>(`${url}/${arg}`),
    { onSuccess: () => mutate(BASE_URL) },
  )
}
