export interface Product {
  id: string
  title: string
  slug: string
  price: number
  compareAtPrice: number | null
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
  tags: string[]
  inventory: number
  category: string
  gender: string
}