import { type NextRequest, NextResponse } from "next/server"

// Mock newsletter subscribers storage
const subscribers: string[] = []

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  // Basic validation
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
  }

  // Check if already subscribed
  if (subscribers.includes(email)) {
    return NextResponse.json({ error: "Email already subscribed" }, { status: 409 })
  }

  // Add to subscribers
  subscribers.push(email)

  return NextResponse.json({
    message: "Successfully subscribed to newsletter",
    email,
  })
}
