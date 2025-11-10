import { Product } from "../enities/product";

export interface ProductRepository {
  getProductsByCollection(collection: string): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product | null>
  searchProducts(keyWord: string): Promise<Product[]>
}
