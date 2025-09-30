import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { MiniCart } from "@/components/mini-cart"
import { Toaster } from "sonner"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Athleon - Premium Athletic Wear",
  description: "Discover premium athletic wear and performance gear designed for champions.",
  keywords: "athletic wear, sportswear, performance gear, running, training",
  openGraph: {
    title: "Athleon - Premium Athletic Wear",
    description: "Discover premium athletic wear and performance gear designed for champions.",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background font-body text-foreground">
        <CartProvider>
          {children}
          <Toaster richColors position="top-right" />
          <MiniCart />
        </CartProvider>
      </body>
    </html>
  )
}
