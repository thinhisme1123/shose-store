// domain/entities/review.ts
export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number   // 1–5
  title: string
  content: string
  images?: string[]
  createdAt?: Date
}
