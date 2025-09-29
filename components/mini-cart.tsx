"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"

export function MiniCart() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={closeCart} asChild>
                  <Link href="/collections/all">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <h3 className="font-medium text-sm leading-tight">{item.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          {item.color} • {item.size}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Footer */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" onClick={closeCart} asChild>
                    <Link href="/cart">View Cart</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={closeCart} asChild>
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
