import { request } from '../lib/request'
import { API_URL } from './url'
import type { Product, CreateProductDTO } from '../types/product'

const BASE = `${API_URL}/products`

export function getProducts() {
  return request<Product[]>(BASE, { errorMessage: 'Error al obtener productos' })
}

export function createProduct(dto: CreateProductDTO) {
  return request<Product>(BASE, {
    method: 'POST',
    body: dto,
    errorMessage: 'Error al crear producto',
    successMessage: 'Producto creado correctamente',
  })
}

export function updateProduct(id: number, dto: Partial<CreateProductDTO>) {
  return request<Product>(`${BASE}/${id}`, {
    method: 'PATCH',
    body: dto,
    errorMessage: 'Error al actualizar producto',
  })
}

export function deleteProduct(id: number) {
  return request<boolean>(`${BASE}/${id}`, {
    method: 'DELETE',
    errorMessage: 'Error al eliminar producto',
    successMessage: 'Producto eliminado correctamente',
  })
}
