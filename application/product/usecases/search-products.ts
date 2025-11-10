import { ProductService } from "../service/product-service"

export const searchProductsUseCase = async (service: ProductService, keyword: string) => {
  return await service.searchProducts(keyword)
}
