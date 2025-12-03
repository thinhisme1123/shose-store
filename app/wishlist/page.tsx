"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, Trash2, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"

export default function WishlistPage() {
  const router = useRouter()
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem, openCart } = useCart()

  const handleAddToCart = (item: any) => {
    addItem({
        productId: item.productId,
        title: item.title,
        price: item.price,
        image: item.image,
        color: "Default",
        size: "M",
        quantity: 1,
        id: ""
    })
    openCart()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col items-center justify-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Save your favorite items here so you can easily find them later.
            </p>
            <Button asChild size="lg">
              <Link href="/collections/men">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          {items.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.productId} className="overflow-hidden group">
              <Link href={`/product/${item.slug}`}>
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/product/${item.slug}`}>
                  <h3 className="font-medium text-sm text-balance mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="font-semibold text-foreground">{formatPrice(item.price)}</span>
                  {item.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(item.compareAtPrice)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handleAddToCart(item)}>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => removeItem(item.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
