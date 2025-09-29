import Image from "next/image"
import Link from "next/link"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/collections/${category.slug}`}
      className="group relative overflow-hidden rounded-lg bg-muted aspect-square"
    >
      <Image
        src={category.image || "/placeholder.svg"}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white font-sans font-semibold text-xl text-center">{category.name}</h3>
      </div>
    </Link>
  )
}
