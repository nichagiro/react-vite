export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: { id: number; name: string; image: string }
  images: string[]
}

export type CreateProductDTO = {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

export type UpdateProductDTO = {
  id: number
  data: Partial<CreateProductDTO>
}
