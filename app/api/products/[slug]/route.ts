import { type NextRequest, NextResponse } from "next/server"
import products from "@/lib/products.json"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return NextResponse.json({
    product,
    relatedProducts,
  })
}
