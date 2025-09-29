"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import productsData from "@/lib/products.json"
import { formatPrice } from "@/lib/utils"

interface CollectionPageProps {
  params: {
    collection: string
  }
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 300])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get collection info
  const collection = productsData.categories.find((cat) => cat.slug === params.collection)
  const collectionTitle = collection?.name || params.collection.charAt(0).toUpperCase() + params.collection.slice(1)

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = productsData.products

    // Filter by category if it's a specific category
    if (collection) {
      products = products.filter((product) => product.category === collection.id)
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      products = products.filter((product) => product.colors.some((color) => selectedColors.includes(color)))
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      products = products.filter((product) => product.sizes.some((size) => selectedSizes.includes(size)))
    }

    // Filter by price range
    products = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        products.sort((a, b) => b.id.localeCompare(a.id))
        break
      default:
        // Keep original order for "featured"
        break
    }

    return products
  }, [collection, selectedColors, selectedSizes, priceRange, sortBy])

  // Get all available colors and sizes
  const allColors = Array.from(new Set(productsData.products.flatMap((p) => p.colors)))
  const allSizes = Array.from(new Set(productsData.products.flatMap((p) => p.sizes)))

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const clearFilters = () => {
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 300])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear filters */}
      {(selectedColors.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 300) && (
        <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={300} min={0} step={10} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-4">Colors</h3>
        <div className="space-y-3">
          {allColors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <label htmlFor={`color-${color}`} className="text-sm cursor-pointer flex items-center space-x-2">
                <div
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
                />
                <span>{color}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-4">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-lg mb-2">{collectionTitle}</h1>
          <p className="body-md text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="font-semibold mb-6">Filters</h2>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter & Sort */}
            <div className="flex items-center justify-between mb-6 lg:justify-end">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="body-lg text-muted-foreground mb-4">No products found matching your filters.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
