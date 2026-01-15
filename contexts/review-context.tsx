"use client";

import { createContext, useContext, type ReactNode } from "react";

interface ReviewContextType {
  createReview: (
    data: CreateReviewData
  ) => Promise<{ success?: boolean; review?: any; error?: string }>;
  getReviews: (
    productId: string,
    options?: { page?: number; limit?: number; sort?: string }
  ) => Promise<{ reviews: any[]; total: number; hasMore: boolean }>;
  deleteReview: (reviewId: string) => Promise<boolean>;
  upvoteReview: (reviewId: string) => Promise<boolean>;
}

interface CreateReviewData {
  productId: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const createReview = async (data: CreateReviewData) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("Create review failed:", result);
        throw new Error(result?.message || "Bad request");
      }

      return result;
    } catch (error) {
      console.error("Create review error:", error);
      return { success: false, error: "Failed to create review" };
    }
  };

  const getReviews = async (
    productId: string,
    options: { page?: number; limit?: number; sort?: string } = {}
  ) => {
    try {
      const { page = 1, limit = 10, sort = "newest" } = options;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review/find-by-productid/${productId}`
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Get reviews error:", error);
      return { reviews: [], total: 0, hasMore: false };
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      return response.ok;
    } catch (error) {
      console.error("Delete review error:", error);
      return false;
    }
  };

  const upvoteReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}/upvote`, {
        method: "POST",
      });

      return response.ok;
    } catch (error) {
      console.error("Upvote review error:", error);
      return false;
    }
  };

  return (
    <ReviewContext.Provider
      value={{ createReview, getReviews, deleteReview, upvoteReview }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
}
