import { ProductService } from "../service/product-service"

export const getProductBySlugUseCase = async (
  service: ProductService,
  slug: string
) => {
  return await service.getProductBySlug(slug)
}
