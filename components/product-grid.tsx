import { Product } from "@/domain/product/enities/product"
import { ProductCard } from "./product-card"

interface ProductGridProps {
  products: Product[]
  className?: string
}

export function ProductGrid({ products, className = "" }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
