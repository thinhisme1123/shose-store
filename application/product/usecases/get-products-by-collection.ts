import { ProductService } from "../service/product.service"

export const getProductsByCollectionUseCase = async (
  service: ProductService,
  collection: string
) => {
  return await service.getProductsByCollection(collection)
}
