"use client";

import { useState, useEffect } from "react";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReview } from "@/contexts/review-context";
import { Loader2 } from "lucide-react";

interface ReviewListProps {
  productId: string;
  refreshTrigger?: number;
}

export function ReviewList({ productId, refreshTrigger }: ReviewListProps) {
  const { getReviews } = useReview();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  const FAKE_REVIEWS = Array.from({ length: 13 }).map((_, i) => ({
    id: `review-${i + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    comment:
      "This product is actually pretty solid. Build quality feels nice and shipping was fast.",
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    helpfulCount: Math.floor(Math.random() * 20),
    user: {
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      avatar: "https://i.pravatar.cc/150?img=" + (i + 5),
    },
  }));

  const loadReviews = async (pageNum: number, sort: string, append = false) => {
    setLoading(true);
    // const result = await getReviews(productId, {
    //   page: pageNum,
    //   limit: 5,
    //   sort,
    // });

    const start = (pageNum - 1) * 5;
    const end = start + 5;

    const paginatedReviews = FAKE_REVIEWS.slice(start, end);

    const result = {
      reviews: paginatedReviews,
      total: FAKE_REVIEWS.length,
      hasMore: end < FAKE_REVIEWS.length,
    };
    setLoading(false);

    if (append) {
      setReviews([...reviews, ...result.reviews]);
    } else {
      setReviews(result.reviews);
    }

    setHasMore(result.hasMore);
    setTotal(result.total);
  };

  useEffect(() => {
    loadReviews(1, sortBy, false);
  }, [productId, sortBy, refreshTrigger]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadReviews(nextPage, sortBy, true);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  if (loading && page === 1) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {reviews.length} of {total} reviews
        </p>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={() => loadReviews(1, sortBy, false)}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More Reviews"}
          </Button>
        </div>
      )}
    </div>
  );
}
