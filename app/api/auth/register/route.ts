import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in real app, this would be a proper database)
const users: any[] = []

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, password } = await request.json()

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
  }

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 })
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email,
    password, // In real app, this would be hashed
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)

  // Generate token (in real app, use proper JWT)
  const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser

  return NextResponse.json({
    user: userWithoutPassword,
    token,
    message: "Registration successful",
  })
}
