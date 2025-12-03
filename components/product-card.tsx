"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { Product } from "@/domain/product/enities/product";
import { calculateDiscount, formatPrice } from "@/lib/utils";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const discount = calculateDiscount(product.price, product.compareAtPrice);
  const { addItem, openCart } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const { isAuthenticated } = useAuth();

  const inWishlist = isInWishlist(product._id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    addItem({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      color: product.colors[0],
      size: product.sizes[0],
      quantity: 1,
      id: "",
    });

    openCart();
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        _id: product._id,
        productId: product._id,
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
    <div
      className="group relative bg-card rounded-lg overflow-hidden product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={product.images[currentImageIndex] || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Discount badge */}
          {discount > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-600 text-white font-semibold">
              -{discount}%
            </Badge>
          )}

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-4 w-4 ${
                inWishlist ? "fill-primary text-primary" : ""
              }`}
            />
          </Button>

          {/* Quick add button */}
          <Button
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleQuickAdd}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>

          {/* Image indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? "bg-primary"
                      : "bg-background/60"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-sm text-balance mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          <div className="flex items-center space-x-2">
            <span className="font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Color options */}
          <div className="flex items-center space-x-2 mt-3">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={color}
                className={`w-4 h-4 rounded-full border-2 border-border ${
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
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
