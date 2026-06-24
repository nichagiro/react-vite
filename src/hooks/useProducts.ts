import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/products'
import type { CreateProductDTO, Product, UpdateProductDTO } from '../types/product'

const PRODUCTS_KEY = 'products'

export function useProducts() {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    PRODUCTS_KEY,
    getProducts,
  )

  const { trigger: create, isMutating: creating } = useSWRMutation(
    PRODUCTS_KEY,
    async (_key: string, { arg }: { arg: CreateProductDTO }) => createProduct(arg),
    { onSuccess: () => mutate() },
  )

  const { trigger: update, isMutating: updating } = useSWRMutation(
    PRODUCTS_KEY,
    async (_key: string, { arg }: { arg: UpdateProductDTO }) =>
      updateProduct(arg.id, arg.data),
    { onSuccess: () => mutate() },
  )

  const { trigger: remove, isMutating: deleting } = useSWRMutation(
    PRODUCTS_KEY,
    async (_key: string, { arg }: { arg: number }) => deleteProduct(arg),
    { onSuccess: () => mutate() },
  )

  return {
    products: data ?? [], isLoading, error, mutate,
    create, creating,
    update, updating,
    remove, deleting,
  }
}
