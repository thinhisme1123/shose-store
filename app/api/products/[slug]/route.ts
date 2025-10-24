import { type NextRequest, NextResponse } from "next/server"
import data from "@/lib/products.json"
import { Product } from "@/domain/enities/product"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params
  const productList = (data.products as Product[])

  const product = productList.find((p) => p.slug === slug)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  const relatedProducts = productList
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return NextResponse.json({
    product,
    relatedProducts,
  })
}
