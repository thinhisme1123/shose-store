import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: 1,
    email: "demo@athleon.com",
    password: "password123", // In real app, this would be hashed
    name: "Demo User",
    firstName: "Demo",
    lastName: "User",
  },
]

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  // Basic validation
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
  }

  // Find user
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  // In a real app, you would generate a JWT token here
  const token = `mock-jwt-token-${user.id}-${Date.now()}`

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user

  return NextResponse.json({
    user: userWithoutPassword,
    token,
    message: "Login successful",
  })
}
