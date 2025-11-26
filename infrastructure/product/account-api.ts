export class AccountApi {
  async register(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || "Registration failed")
    }

    return res.json()
  }
}
