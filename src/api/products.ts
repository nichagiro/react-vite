import { request } from '../lib/request'
import { API_URL } from './url'
import type { Product, CreateProductDTO } from '../types/product'

const BASE = `${API_URL}/products`

export async function getProducts() {
  return await request<Product[]>(BASE, { errorMessage: 'Error al obtener productos' })
}

export async function createProduct(dto: CreateProductDTO) {
  return await request<Product>(BASE, {
    method: 'POST',
    body: dto,
    errorMessage: 'Error al crear producto',
    successMessage: 'Producto creado correctamente',
  })
}

export async function updateProduct(id: number, dto: Partial<CreateProductDTO>) {
  return await request<Product>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: dto,
    errorMessage: 'Error al actualizar producto',
  })
}

export async function deleteProduct(id: number) {
  return await request<boolean>(`${BASE}/${id}`, {
    method: 'DELETE',
    errorMessage: 'Error al eliminar producto',
    successMessage: 'Producto eliminado correctamente',
  })
}
