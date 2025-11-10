import { Skeleton } from "./skeleton";

export const SkeletonGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
)