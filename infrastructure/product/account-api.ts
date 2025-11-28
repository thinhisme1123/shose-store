import { User } from "@/domain/product/enities/user";
import { AccountRepository } from "@/domain/product/repositories/account-repository";

export class AccountApi implements AccountRepository{
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) : Promise<User> {
    
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Registration failed");
    }

    return res.json();
  }

  async login(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    return data;
  }


}
