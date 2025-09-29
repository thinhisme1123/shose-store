"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart()

  const shippingCost = totalPrice >= 75 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shippingCost + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
            <h1 className="heading-lg mb-4">Your cart is empty</h1>
            <p className="body-md text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild>
              <Link href="/collections/all">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-lg">Shopping Cart ({totalItems})</h1>
          <Button variant="outline" onClick={clearCart} className="bg-transparent">
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex space-x-4 p-6 bg-card rounded-lg border">
                <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.color} • {item.size}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium w-12 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(item.price * item.quantity)}</div>
                      <div className="text-sm text-muted-foreground">{formatPrice(item.price)} each</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {totalPrice < 75 && (
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <p className="text-sm text-center">Add {formatPrice(75 - totalPrice)} more for free shipping!</p>
                </div>
              )}

              {/* Promo Code */}
              <div className="mb-6">
                <label htmlFor="promo" className="block text-sm font-medium mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <Input id="promo" placeholder="Enter code" />
                  <Button variant="outline" className="bg-transparent">
                    Apply
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/collections/all">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
