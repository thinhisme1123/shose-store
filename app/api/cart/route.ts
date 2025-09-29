import { type NextRequest, NextResponse } from "next/server"
import products from "@/lib/products.json"

// In a real app, this would be stored in a database with user sessions
const cartStorage: Record<string, any[]> = {}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId") || "anonymous"

  const cartItems = cartStorage[sessionId] || []

  // Enrich cart items with product details
  const enrichedItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  const total = enrichedItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  return NextResponse.json({
    items: enrichedItems,
    total,
    itemCount: enrichedItems.reduce((sum, item) => sum + item.quantity, 0),
  })
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId") || "anonymous"

  const { productId, quantity, selectedColor, selectedSize } = await request.json()

  if (!cartStorage[sessionId]) {
    cartStorage[sessionId] = []
  }

  const existingItemIndex = cartStorage[sessionId].findIndex(
    (item) =>
      item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize,
  )

  if (existingItemIndex > -1) {
    cartStorage[sessionId][existingItemIndex].quantity += quantity
  } else {
    cartStorage[sessionId].push({
      id: Date.now().toString(),
      productId,
      quantity,
      selectedColor,
      selectedSize,
      addedAt: new Date().toISOString(),
    })
  }

  return NextResponse.json({ success: true })
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId") || "anonymous"

  const { itemId, quantity } = await request.json()

  if (!cartStorage[sessionId]) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 })
  }

  const itemIndex = cartStorage[sessionId].findIndex((item) => item.id === itemId)

  if (itemIndex === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 })
  }

  if (quantity <= 0) {
    cartStorage[sessionId].splice(itemIndex, 1)
  } else {
    cartStorage[sessionId][itemIndex].quantity = quantity
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId") || "anonymous"
  const itemId = searchParams.get("itemId")

  if (!cartStorage[sessionId]) {
    return NextResponse.json({ error: "Cart not found" }, { status: 404 })
  }

  if (itemId) {
    cartStorage[sessionId] = cartStorage[sessionId].filter((item) => item.id !== itemId)
  } else {
    cartStorage[sessionId] = []
  }

  return NextResponse.json({ success: true })
}
