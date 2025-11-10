import { ProductRepository } from "@/domain/product/repositories/product-repository";
import { Product } from "@/domain/product/enities/product";

export class ProductService {
  constructor(private repo: ProductRepository) {}

  async getProductsByCollection(collection: string): Promise<Product[]> {
    return this.repo.getProductsByCollection(collection);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return this.repo.getProductBySlug(slug);
  }

  async searchProducts(keyword: string) {
    return this.repo.searchProducts(keyword);
  }
}
