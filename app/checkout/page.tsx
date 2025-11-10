"use client";

import type React from "react";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/contexts/cart-context";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { toast } from "sonner";
import { StringToBoolean } from "class-variance-authority/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Package } from "lucide-react";
import { OrderData } from "@/domain/product/enities/orderdata";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");

  const shippingCost = totalPrice >= 75 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const sendOrderEmail = async (orderData: OrderData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/send-order-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Extract form data
      const orderData: OrderData & { orderDetails: any } = {
        // Contact Information
        email: formData.get("email") as string,
        newsletter: formData.get("newsletter") === "on",

        // Shipping Address
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        address: formData.get("address") as string,
        apartment: (formData.get("apartment") as string) || "",
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zip: formData.get("zip") as string,

        // Payment method
        paymentMethod: formData.get("paymentMethod") as string,

        // Order Details
        orderDetails: {
          items: items,
          subtotal: totalPrice,
          shippingCost: shippingCost,
          tax: tax,
          total: finalTotal,
          orderDate: new Date().toISOString(),
          orderId: `ORDER-${Date.now()}`,
        },
      };

      // Add billing address if different from shipping
      if (!sameAsShipping) {
        orderData.billingFirstName = formData.get("billingFirstName") as string;
        orderData.billingLastName = formData.get("billingLastName") as string;
        orderData.billingAddress = formData.get("billingAddress") as string;
        orderData.billingCity = formData.get("billingCity") as string;
        orderData.billingState = formData.get("billingState") as string;
        orderData.billingZip = formData.get("billingZip") as string;
      }

      // Log the order data
      console.log("Order Data:", orderData);

      // Send email notification
      await sendOrderEmail(orderData);

      // Clear the cart
      clearCart();

      // Show success message
      toast.success(
        `Order ${orderData.orderDetails.orderId} completed successfully!`
      );

      // Redirect to success page or reset form
      // router.push('/order-success')
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(`${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <h2 className="font-semibold text-lg mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="newsletter" name="newsletter" />
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
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="apartment">
                      Apartment, suite, etc. (optional)
                    </Label>
                    <Input id="apartment" name="apartment" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select name="state" required>
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
                    <Input id="zip" name="zip" required />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onCheckedChange={(val) => setSameAsShipping(val === true)}
                  />
                  <Label htmlFor="sameAsShipping">
                    Same as shipping address
                  </Label>
                </div>

                {!sameAsShipping && (
                  <div>
                    <h2 className="font-semibold text-lg mb-4">
                      Billing Address
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billingFirstName">First Name</Label>
                        <Input
                          id="billingFirstName"
                          name="billingFirstName"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingLastName">Last Name</Label>
                        <Input
                          id="billingLastName"
                          name="billingLastName"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="billingAddress">Address</Label>
                        <Input
                          id="billingAddress"
                          name="billingAddress"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billingCity">City</Label>
                        <Input id="billingCity" name="billingCity" required />
                      </div>
                      <div>
                        <Label htmlFor="billingState">State</Label>
                        <Select name="billingState" required>
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
                        <Input id="billingZip" name="billingZip" required />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-semibold text-lg mb-4">Payment Method</h2>
                <RadioGroup
                  name="paymentMethod"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {/* Cash on Delivery Option */}
                  <Label
                    htmlFor="cod"
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="h-10 w-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-normal">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                  </Label>

                  {/* Bank Transfer Option */}
                  <Label
                    htmlFor="bank-transfer"
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "bank-transfer"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem
                      value="bank-transfer"
                      id="bank-transfer"
                      className="mt-1"
                    />{" "}
                    {/* Adjust class if you want to hide: add 'sr-only' */}
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="h-10 w-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="font-normal">Bank Transfer</span>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing Order..." : "Complete Order"}
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
                      <p className="font-medium text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
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
                  <span>
                    {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                  </span>
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
  );
}
