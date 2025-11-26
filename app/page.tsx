import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { CategoryCard } from "@/components/category-card";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import productsData from "@/lib/products.json";

export default function HomePage() {
  const featuredProducts = productsData.products.slice(0, 4);
  const newProducts = productsData.products.slice(2, 6);
  const categories = productsData.categories.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Shop by Category</h2>
              <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our complete range of premium athletic wear designed
                for every sport and lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="heading-lg mb-2">Featured Products</h2>
                <p className="body-md text-muted-foreground">
                  Handpicked essentials for peak performance
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/collections/featured">View All</Link>
              </Button>
            </div>

            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge
                variant="secondary"
                className="mb-4 bg-primary-foreground/20 text-primary-foreground"
              >
                Limited Time
              </Badge>
              <h2 className="heading-lg mb-4">
                Free Shipping on Orders Over $75
              </h2>
              <p className="body-lg mb-8 text-primary-foreground/90">
                Get your gear delivered fast with complimentary shipping on
                qualifying orders. No code needed, discount applied at checkout.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/collections/all">Shop Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="heading-lg mb-2">New Arrivals</h2>
                <p className="body-md text-muted-foreground">
                  The latest innovations in athletic performance
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/collections/new">View All</Link>
              </Button>
            </div>

            <ProductGrid products={newProducts} />
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-lg mb-6">Built for Champions</h2>
                <p className="body-lg mb-6 text-muted-foreground">
                  At Athleon, we believe that every athlete deserves gear that
                  matches their dedication. Our premium athletic wear is
                  engineered with cutting-edge materials and innovative design
                  to help you perform at your peak.
                </p>
                <p className="body-md mb-8 text-muted-foreground">
                  From moisture-wicking fabrics to ergonomic fits, every detail
                  is crafted to enhance your performance and comfort, whether
                  you're training for your next PR or conquering everyday
                  challenges.
                </p>
                <Button asChild>
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>

              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/athletic-training-gym-equipment.jpg"
                  alt="Athletic training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Performance Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Trusted by Athletes Worldwide</h2>
              <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of athletes who trust Athleon for their
                performance needs.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="heading-lg text-primary mb-2">50K+</div>
                <p className="body-md text-muted-foreground">Happy Athletes</p>
              </div>
              <div>
                <div className="heading-lg text-primary mb-2">25+</div>
                <p className="body-md text-muted-foreground">Countries</p>
              </div>
              <div>
                <div className="heading-lg text-primary mb-2">98%</div>
                <p className="body-md text-muted-foreground">
                  Satisfaction Rate
                </p>
              </div>
              <div>
                <div className="heading-lg text-primary mb-2">5★</div>
                <p className="body-md text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
