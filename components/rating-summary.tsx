"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface RatingSummaryProps {
  productId: string
}

export function RatingSummary({ productId }: RatingSummaryProps) {
  const [stats, setStats] = useState({
    avgRating: 0,
    reviewCount: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  })

  useEffect(() => {
    fetch(`/api/reviews/stats?productId=${productId}`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error)
  }, [productId])

  const getPercentage = (count: number) => {
    if (stats.reviewCount === 0) return 0
    return Math.round((count / stats.reviewCount) * 100)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div className="text-center">
        <div className="text-5xl font-bold mb-2">{stats.avgRating.toFixed(1)}</div>
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < Math.round(stats.avgRating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Based on {stats.reviewCount} reviews</p>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm">{rating}</span>
              <Star className="h-3 w-3 fill-primary text-primary" />
            </div>
            <Progress
              value={getPercentage(stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution])}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
