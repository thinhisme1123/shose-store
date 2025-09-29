"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/contexts/cart-context"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const [sameAsShipping, setSameAsShipping] = useState(true)

  const shippingCost = totalPrice >= 75 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shippingCost + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Process payment
    alert("Checkout functionality would be implemented here")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="heading-lg mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" />
                    <Label htmlFor="newsletter" className="text-sm">
                      Email me with news and offers
                    </Label>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input id="apartment" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        {/* Add more states */}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="sameAsShipping" checked={sameAsShipping} onCheckedChange={setSameAsShipping} />
                  <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                </div>

                {!sameAsShipping && (
                  <div>
                    <h2 className="font-semibold text-lg mb-4">Billing Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">First Name</Label>
                        <Input id="billingFirstName" required />
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">Last Name</Label>
                        <Input id="billingLastName" required />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="billingAddress">Address</Label>
                        <Input id="billingAddress" required />
                      </div>
                      <div>
                        <Label htmlFor="billingCity">City</Label>
                        <Input id="billingCity" required />
                      </div>
                      <div>
                        <Label htmlFor="billingState">State</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="tx">Texas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="billingZip">ZIP Code</Label>
                        <Input id="billingZip" required />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Payment</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" required />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Complete Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-lg border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.color} • {item.size}
                      </p>
                      <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
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
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
