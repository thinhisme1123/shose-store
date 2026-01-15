"use client"

import type React from "react"

import { use, useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useReview } from "@/contexts/review-context"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

interface ReviewFormProps {
  productId: string
  onSuccess?: () => void
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { user, isAuthenticated } = useAuth()
  const { createReview } = useReview()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    if (!title.trim() || !content.trim()) {
      setError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    const result = await createReview({
      productId,
      rating,
      title: title.trim(),
      content: content.trim(),
    })

    setIsSubmitting(false)

    if (result) {
      setRating(0)
      setTitle("")
      setContent("")
      toast.success("You comment is created successfully!")
      if (onSuccess) onSuccess()
    } else {
      setError("Failed to submit review")
    }
  }

  if (!isAuthenticated) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground mb-4">Please log in to write a review</p>
        <Button onClick={() => router.push("/login")} className="w-full">
          Log In
        </Button>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating) ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="review-title" className="block text-sm font-medium mb-2">
            Review Title
          </label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum up your experience in a few words"
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="review-body" className="block text-sm font-medium mb-2">
            Review
          </label>
          <Textarea
            id="review-body"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={5}
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground mt-1">{content.length}/1000 characters</p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Card>
  )
}
