import { type NextRequest, NextResponse } from "next/server"
import data from "@/lib/products.json"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const colors = searchParams.get("colors")?.split(",")
  const sizes = searchParams.get("sizes")?.split(",")
  const sort = searchParams.get("sort")

  const productList = data.products

  let filteredProducts = [...productList]

  // Filter by category
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm),
    )
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseFloat(minPrice))
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseFloat(maxPrice))
  }

  // Filter by colors
  if (colors && colors.length > 0) {
    filteredProducts = filteredProducts.filter((product) => product.colors.some((color) => colors.includes(color)))
  }

  // Filter by sizes
  if (sizes && sizes.length > 0) {
    filteredProducts = filteredProducts.filter((product) => product.sizes.some((size) => sizes.includes(size)))
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name":
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "newest":
        // Assuming products are already in newest-first order
        break
      default:
        break
    }
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
    filters: {
      categories: [...new Set(productList.map((p) => p.category))],
      colors: [...new Set(productList.flatMap((p) => p.colors))],
      sizes: [...new Set(productList.flatMap((p) => p.sizes))],
      priceRange: {
        min: Math.min(...productList.map((p) => p.price)),
        max: Math.max(...productList.map((p) => p.price)),
      },
    },
  })
}
