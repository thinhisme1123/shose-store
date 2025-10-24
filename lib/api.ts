// API utility functions for client-side requests

import { Product } from "@/domain/enities/product"

export interface CartItem {
  id: string
  productId: number
  quantity: number
  selectedColor: string
  selectedSize: string
  product?: Product
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Products API
export const productsApi = {
  getAll: async (params?: {
    category?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    colors?: string[]
    sizes?: string[]
    sort?: string
  }): Promise<ApiResponse<{ products: Product[]; total: number; filters: any }>> => {
    const searchParams = new URLSearchParams()

    if (params?.category) searchParams.set("category", params.category)
    if (params?.search) searchParams.set("search", params.search)
    if (params?.minPrice) searchParams.set("minPrice", params.minPrice.toString())
    if (params?.maxPrice) searchParams.set("maxPrice", params.maxPrice.toString())
    if (params?.colors) searchParams.set("colors", params.colors.join(","))
    if (params?.sizes) searchParams.set("sizes", params.sizes.join(","))
    if (params?.sort) searchParams.set("sort", params.sort)

    try {
      const response = await fetch(`/api/products?${searchParams}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to fetch products" }
    }
  },

  getBySlug: async (slug: string): Promise<ApiResponse<{ product: Product; relatedProducts: Product[] }>> => {
    try {
      const response = await fetch(`/api/products/${slug}`)
      if (!response.ok) {
        return { error: "Product not found" }
      }
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to fetch product" }
    }
  },
}

// Cart API
export const cartApi = {
  get: async (sessionId?: string): Promise<ApiResponse<{ items: CartItem[]; total: number; itemCount: number }>> => {
    try {
      const params = sessionId ? `?sessionId=${sessionId}` : ""
      const response = await fetch(`/api/cart${params}`)
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to fetch cart" }
    }
  },

  add: async (item: {
    productId: number
    quantity: number
    selectedColor: string
    selectedSize: string
    sessionId?: string
  }): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      const params = item.sessionId ? `?sessionId=${item.sessionId}` : ""
      const response = await fetch(`/api/cart${params}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to add item to cart" }
    }
  },

  update: async (itemId: string, quantity: number, sessionId?: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      const params = sessionId ? `?sessionId=${sessionId}` : ""
      const response = await fetch(`/api/cart${params}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity }),
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to update cart item" }
    }
  },

  remove: async (itemId: string, sessionId?: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      const params = new URLSearchParams()
      if (sessionId) params.set("sessionId", sessionId)
      if (itemId) params.set("itemId", itemId)

      const response = await fetch(`/api/cart?${params}`, {
        method: "DELETE",
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to remove cart item" }
    }
  },

  clear: async (sessionId?: string): Promise<ApiResponse<{ success: boolean }>> => {
    try {
      const params = sessionId ? `?sessionId=${sessionId}` : ""
      const response = await fetch(`/api/cart${params}`, {
        method: "DELETE",
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      return { error: "Failed to clear cart" }
    }
  },
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error }
      }

      return { data }
    } catch (error) {
      return { error: "Failed to login" }
    }
  },

  register: async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<ApiResponse<{ user: any; token: string }>> => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error }
      }

      return { data }
    } catch (error) {
      return { error: "Failed to register" }
    }
  },
}

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()

      if (!response.ok) {
        return { error: data.error }
      }

      return { data }
    } catch (error) {
      return { error: "Failed to subscribe" }
    }
  },
}
