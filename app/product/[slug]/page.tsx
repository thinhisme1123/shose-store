"use client";

import { ProductService } from "@/application/product/usercase/product.usecase";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import { RatingSummary } from "@/components/rating-summary";
import { ReviewForm } from "@/components/review-form";
import { ReviewList } from "@/components/review-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { Product } from "@/domain/product/enities/product";
import { ProductApi } from "@/infrastructure/product/product-api";
import { formatPrice } from "@/lib/utils";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);

  const { addItem, openCart } = useCart();

  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const repo = new ProductApi();
        const service = new ProductService(repo);

        const data = await service.getProductBySlug(params.slug);

        if (!data) {
          notFound();
        }

        setProduct(data);
        setSelectedColor(data.colors?.[0] || "");

        const allProducts = await service.getProductsByCollection(
          data.category
        );
        const related = allProducts
          .filter((p) => p.category === data.category && p._id !== data._id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);

  const discount =
    product.compareAtPrice && product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100
        )
      : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    addItem({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity,
      id: "",
    });

    openCart();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      // else if to handle logged or not
      addToWishlist({
        _id: product._id,
        title: product.title,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        image: product.images[0],
        slug: product.slug,
        category: product.category,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-semibold">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square w-20 relative overflow-hidden rounded-md border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-border"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="heading-lg mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    (4.8)
                  </span>
                </div>
              </div>
              <p className="body-md text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      selectedColor === color
                        ? "border-primary"
                        : "border-border"
                    } ${
                      color.toLowerCase() === "black"
                        ? "bg-black"
                        : color.toLowerCase() === "white"
                        ? "bg-white"
                        : color.toLowerCase() === "orange"
                        ? "bg-orange-500"
                        : color.toLowerCase() === "charcoal"
                        ? "bg-gray-700"
                        : "bg-gray-400"
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.inventory}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                size="lg"
                className="w-full bg-transparent cursor-pointer"
              >
                <Heart
                  className={`h-4 w-4 ${
                    inWishlist ? "fill-primary text-primary" : ""
                  }`}
                />
                Add to Wishlist
              </Button>
            </div>

            {/* Product Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">
                  Free shipping on orders over $75
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">30-day returns</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="body-lg mb-4">{product.description}</p>
                <p className="body-md text-muted-foreground">
                  Engineered for peak performance, this premium athletic wear
                  combines cutting-edge materials with innovative design.
                  Features include moisture-wicking technology, four-way stretch
                  fabric, and ergonomic construction for maximum comfort and
                  mobility.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Materials</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 88% Polyester, 12% Elastane</li>
                    <li>• Moisture-wicking fabric</li>
                    <li>• Anti-odor technology</li>
                    <li>• UPF 30+ sun protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Care Instructions</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Machine wash cold</li>
                    <li>• Do not bleach</li>
                    <li>• Tumble dry low</li>
                    <li>• Do not iron</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-8">
                <RatingSummary productId={product._id} />

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold text-lg mb-4">
                      Customer Reviews
                    </h3>
                    <ReviewList
                      productId={product._id}
                      refreshTrigger={reviewRefreshTrigger}
                    />
                  </div>

                  <div>
                    <ReviewForm
                      productId={product._id}
                      onSuccess={() =>
                        setReviewRefreshTrigger(reviewRefreshTrigger + 1)
                      }
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="heading-md mb-8">You Might Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
