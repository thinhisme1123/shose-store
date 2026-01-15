"use client"

import { useState } from "react"
import { Star, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useReview } from "@/contexts/review-context"
import Image from "next/image"

interface ReviewCardProps {
  review: {
    id: string
    userName: string
    rating: number
    title: string
    content: string
    images?: string[]
    helpful: number
    createdAt: string
    userId: string
  }
  onDelete?: () => void
}

export function ReviewCard({ review, onDelete }: ReviewCardProps) {
  const { user } = useAuth()
  const { upvoteReview, deleteReview } = useReview()
  const [helpful, setHelpful] = useState(review.helpful)
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = user?.id === review.userId

  const handleUpvote = async () => {
    if (hasUpvoted) return
    const success = await upvoteReview(review.id)
    if (success) {
      setHelpful((prev) => prev + 1)
      setHasUpvoted(true)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Delete this review?")) return
    setIsDeleting(true)
    const success = await deleteReview(review.id)
    if (success && onDelete) onDelete()
    setIsDeleting(false)
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })

  return (
    <Card className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
            <Image
              src={`https://i.pravatar.cc/100?u=${review.userId}`}
              alt={review.userName}
              fill
              className="object-cover"
            />
          </div>

          {/* Name + date + rating */}
          <div>
            <p className="font-medium leading-none">{review.userName}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* {isOwner && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )} */}
      </div>

      {/* Content */}
      <div className="space-y-2">
        {review.title && (
          <h4 className="font-semibold leading-snug">{review.title}</h4>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {review.content}
        </p>
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 pt-2">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="relative w-20 h-20 rounded-lg overflow-hidden border"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Review image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleUpvote}
          disabled={hasUpvoted}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ThumbsUp
            className={`h-4 w-4 ${
              hasUpvoted ? "fill-current text-primary" : ""
            }`}
          />
          Helpful ({helpful})
        </Button>
      </div>
    </Card>
  )
}
