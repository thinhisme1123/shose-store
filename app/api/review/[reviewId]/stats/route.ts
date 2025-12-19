import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get("productId")

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  // Mock stats calculation (in real app, calculate from database)
  const mockStats = {
    avgRating: 4.5,
    reviewCount: 127,
    ratingDistribution: {
      5: 85,
      4: 28,
      3: 8,
      2: 4,
      1: 2,
    },
  }

  return NextResponse.json(mockStats)
}
