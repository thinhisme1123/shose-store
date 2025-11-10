"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
import { MegaMenu } from "./mega-menu";
import { useWishlist } from "@/contexts/wishlist-context";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Men", href: "/collections/men" },
  { name: "Women", href: "/collections/women" },
  { name: "Footwear", href: "/collections/footwear" },
  { name: "Accessories", href: "/collections/accessories" },
  { name: "Contact", href: "/contact" },
  { name: "Sale", href: "/collections/sale" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistItems } = useWishlist();
  const router = useRouter();

  let hoverTimeout: NodeJS.Timeout;

  const handleMenuEnter = (menuName: string) => {
    clearTimeout(hoverTimeout);
    setActiveMenu(menuName);
    setIsMenuOpen(true);
  };

  const handleMenuLeave = () => {
    hoverTimeout = setTimeout(() => {
      setActiveMenu(null);
      setIsMenuOpen(false);
    }, 100); // Small delay to allow moving to dropdown
  };

  const handleMegaMenuEnter = () => {
    clearTimeout(hoverTimeout);
  };

  const handleMegaMenuLeave = () => {
    setActiveMenu(null);
    setIsMenuOpen(false);
  };

  const handleSearch = (
    e: React.KeyboardEvent<HTMLInputElement> | React.FormEvent
  ) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button className="cursor-pointer" variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="mx-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative block text-lg font-medium text-foreground hover:text-primary transition-colors group overflow-hidden"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                A
              </span>
            </div>
            <span className="font-sans font-bold text-xl tracking-tight">
              ATHLEON
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() =>
                  item.name !== "Sale" &&
                  item.name !== "Contact" &&
                  handleMenuEnter(item.name)
                }
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 relative"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearch}
                  className="flex items-center space-x-2"
                >
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 h-9"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden sm:flex"
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* Account */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {wishlistItems}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative cursor-pointer"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
        </div>
      </div>

      <MegaMenu
        isOpen={isMenuOpen}
        activeMenu={activeMenu}
        onMouseEnter={handleMegaMenuEnter}
        onMouseLeave={handleMegaMenuLeave}
      />
    </header>
  );
}
