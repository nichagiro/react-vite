import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { useSWRConfig } from 'swr'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products'
import type { CreateProductDTO, Product, UpdateProductDTO } from '../types/product'

const PRODUCTS_KEY = 'products'

export function useProducts() {
  const swr = useSWR<Product[]>(PRODUCTS_KEY, getProducts)
  console.log("🚀 ~ useProducts ~ swr:", swr)
  return { ...swr, data: swr.data ?? [] }
}

export function useCreateProduct() {
  const { mutate } = useSWRConfig()
  return useSWRMutation(
    PRODUCTS_KEY,
    async (_key: string, { arg }: { arg: CreateProductDTO }) => createProduct(arg),
    { onSuccess: () => mutate(PRODUCTS_KEY) },
  )
}

export function useUpdateProduct() {
  const { mutate } = useSWRConfig()
  return useSWRMutation(
    PRODUCTS_KEY,
    async (_key: string, { arg }: { arg: UpdateProductDTO }) =>
      updateProduct(arg.id, arg.data),
    { onSuccess: () => mutate(PRODUCTS_KEY) },
  )
}

export function useDeleteProduct() {
  const { mutate } = useSWRConfig()
  return useSWRMutation(
    PRODUCTS_KEY,
    async (_key: string, { arg }: { arg: number }) => deleteProduct(arg),
    { onSuccess: () => mutate(PRODUCTS_KEY) },
  )
}
