export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: { id: number; name: string; image: string }
  images: string[]
}

export type CreateProductPayload = {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}

export type UpdateProductPayload = {
  id: number
  data: Partial<CreateProductPayload>
}
