import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="heading-lg mb-4">Product Not Found</h1>
        <p className="body-lg text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}
