import { type NextRequest, NextResponse } from "next/server"

// Mock data storage (in real app, this would be a database)
const mockReviews = [
  {
    id: "review-1",
    productId: "air-max-pro",
    userId: "user-1",
    userName: "John Doe",
    userEmail: "john@example.com",
    rating: 5,
    title: "Excellent running shoes!",
    body: "These shoes are incredibly comfortable and provide great support. I've been using them for my daily runs and they've exceeded my expectations. The cushioning is perfect and they look amazing too!",
    images: [],
    helpful: 24,
    isApproved: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-2",
    productId: "air-max-pro",
    userId: "user-2",
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    rating: 4,
    title: "Great quality, runs a bit small",
    body: "Love the design and quality of these shoes. My only complaint is that they run about half a size small, so I'd recommend sizing up. Otherwise, they're perfect for both casual wear and workouts.",
    images: [],
    helpful: 18,
    isApproved: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-3",
    productId: "air-max-pro",
    userId: "user-3",
    userName: "Mike Chen",
    userEmail: "mike@example.com",
    rating: 5,
    title: "Best purchase this year!",
    body: "I was skeptical at first due to the price, but these shoes are worth every penny. The build quality is outstanding, and they're so comfortable I barely notice I'm wearing them. Highly recommended!",
    images: [],
    helpful: 32,
    isApproved: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review-4",
    productId: "air-max-pro",
    userId: "user-4",
    userName: "Emily Rodriguez",
    userEmail: "emily@example.com",
    rating: 3,
    title: "Good but not great",
    body: "The shoes are decent but I expected more for the price. They're comfortable enough but the design is a bit plain for my taste. Still, they get the job done.",
    images: [],
    helpful: 7,
    isApproved: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const productId = searchParams.get("productId")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "10")
  const sort = searchParams.get("sort") || "newest"

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
  }

  // Filter reviews by product
  const filteredReviews = mockReviews.filter((review) => review.productId === productId && review.isApproved)

  // Sort reviews
  if (sort === "newest") {
    filteredReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } else if (sort === "helpful") {
    filteredReviews.sort((a, b) => b.helpful - a.helpful)
  } else if (sort === "highest") {
    filteredReviews.sort((a, b) => b.rating - a.rating)
  } else if (sort === "lowest") {
    filteredReviews.sort((a, b) => a.rating - b.rating)
  }

  // Paginate
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex)

  return NextResponse.json({
    reviews: paginatedReviews,
    total: filteredReviews.length,
    hasMore: endIndex < filteredReviews.length,
    page,
    limit,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, rating, title, body: reviewBody, images } = body

    // Validate
    if (!productId || !rating || !title || !reviewBody) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ success: false, error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    // Get user from session (mock for now)
    const user = {
      id: "user-current",
      firstName: "Current",
      lastName: "User",
      email: "current@example.com",
    }

    // Create new review
    const newReview = {
      id: `review-${Date.now()}`,
      productId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      rating,
      title,
      body: reviewBody,
      images: images || [],
      helpful: 0,
      isApproved: false, // Requires admin approval
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In real app, save to database
    mockReviews.push(newReview)

    return NextResponse.json({
      success: true,
      review: newReview,
      message: "Review submitted successfully! It will be visible after approval.",
    })
  } catch (error) {
    console.error("Create review error:", error)
    return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 })
  }
}
