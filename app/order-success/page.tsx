"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, CheckCircle, Package, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

interface OrderData {
  orderId: string;
  paymentMethod: string;
  items: Array<{
    id: string;
    productId: string;
    title: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
    image?: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  timestamp: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      try {
        setOrder(JSON.parse(lastOrder));
      } catch (error) {
        console.error("Failed to load order:", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <div>Loading...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="heading-lg mb-4">Order Not Found</h1>
          <p className="body-lg text-muted-foreground mb-8">
            We couldn't find your order. Please try again or contact support.
          </p>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <main className="container mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="heading-lg mb-2">Order Confirmed!</h1>
          <p className="body-lg text-muted-foreground mb-4">
            Thank you for your order. We're preparing your items for shipment.
          </p>
          <Badge className="bg-green-100 text-green-800">{order.orderId}</Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border p-8 mb-8">
              <h2 className="font-semibold text-lg mb-6">Order Details</h2>

              {/* Order Info Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Order Number</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.orderId}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-5 w-5">📅</div>
                    <h3 className="font-medium">Order Date</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{orderDate}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Payment Method</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Shipping Status</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-8">
                <h3 className="font-semibold mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex space-x-4 pb-4 border-b last:border-b-0"
                    >
                      <div className="relative h-20 w-20 rounded-md bg-muted overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.color} • {item.size}
                        </p>
                        <div className="flex justify-between">
                          <p className="text-sm">Qty: {item.quantity}</p>
                          <p className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Totals */}
              <div className="border-t mt-8 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {order.shipping === 0
                        ? "Free"
                        : formatPrice(order.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-3">
                    <span>Total</span>
                    <span className="text-primary">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* What's Next */}
            <div className="bg-muted/30 rounded-lg border p-6">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-sm">Order Confirmation</p>
                    <p className="text-xs text-muted-foreground">
                      Check your email for confirmation
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="h-6 w-6 rounded-full border-2 border-primary text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-sm">Processing</p>
                    <p className="text-xs text-muted-foreground">
                      We're preparing your items
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="h-6 w-6 rounded-full border-2 border-muted text-muted-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-sm">Shipped</p>
                    <p className="text-xs text-muted-foreground">
                      You'll receive tracking info
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <div className="h-6 w-6 rounded-full border-2 border-muted text-muted-foreground flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-sm">Delivered</p>
                    <p className="text-xs text-muted-foreground">
                      Your order arrives at your door
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
              >
                <Link href="/account">View My Orders</Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="bg-muted/30 rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about your order, please contact our
                support team.
              </p>
              <Button
                variant="outline"
                asChild
                className="w-full bg-transparent"
                size="sm"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
