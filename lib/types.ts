export interface Product {
  id: string
  title: string
  slug: string
  price: number
  compareAtPrice?: number | null
  images: string[]
  colors: string[]
  sizes: string[]
  description: string
  tags: string[]
  inventory: number
  category: string
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export interface CartItem {
  id: string
  productId: string
  title: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
}

export interface WishlistItem {
  _id: string
  title: string
  price: number
  compareAtPrice?: number | null
  image: string
  slug: string
  category: string
}
