// domain/repositories/review.repository.ts
import { Review } from "../enities/review";

export interface IReviewRepository {
  create(data: Review): Promise<Review>
  findByProduct(productId: string): Promise<Review[]>
  delete(id: string, userId: string): Promise<void>
}
