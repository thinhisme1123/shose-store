"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface MegaMenuProps {
  isOpen: boolean
  activeMenu: string | null
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const megaMenuData = {
  Men: {
    featured: [
      { name: "New Arrivals", href: "/collections/men/new" },
      { name: "Bestsellers", href: "/collections/men/bestsellers" },
      { name: "Shop All Men", href: "/collections/men" },
    ],
    shoes: [
      { name: "All Shoes", href: "/collections/men/shoes" },
      { name: "Running", href: "/collections/men/shoes/running" },
      { name: "Training", href: "/collections/men/shoes/training" },
      { name: "Basketball", href: "/collections/men/shoes/basketball" },
      { name: "Lifestyle", href: "/collections/men/shoes/lifestyle" },
      { name: "Football", href: "/collections/men/shoes/football" },
      { name: "Sandals & Slides", href: "/collections/men/shoes/sandals" },
    ],
    clothing: [
      { name: "All Clothing", href: "/collections/men/clothing" },
      { name: "Tops & T-Shirts", href: "/collections/men/clothing/tops" },
      { name: "Shorts", href: "/collections/men/clothing/shorts" },
      { name: "Pants & Leggings", href: "/collections/men/clothing/pants" },
      { name: "Hoodies & Sweatshirts", href: "/collections/men/clothing/hoodies" },
      { name: "Jackets", href: "/collections/men/clothing/jackets" },
    ],
    sport: [
      { name: "Running", href: "/collections/men/sport/running" },
      { name: "Training", href: "/collections/men/sport/training" },
      { name: "Basketball", href: "/collections/men/sport/basketball" },
      { name: "Football", href: "/collections/men/sport/football" },
      { name: "Golf", href: "/collections/men/sport/golf" },
      { name: "Tennis", href: "/collections/men/sport/tennis" },
    ],
  },
  Women: {
    featured: [
      { name: "New Arrivals", href: "/collections/women/new" },
      { name: "Bestsellers", href: "/collections/women/bestsellers" },
      { name: "Shop All Women", href: "/collections/women" },
    ],
    shoes: [
      { name: "All Shoes", href: "/collections/women/shoes" },
      { name: "Running", href: "/collections/women/shoes/running" },
      { name: "Training", href: "/collections/women/shoes/training" },
      { name: "Lifestyle", href: "/collections/women/shoes/lifestyle" },
      { name: "Basketball", href: "/collections/women/shoes/basketball" },
      { name: "Yoga", href: "/collections/women/shoes/yoga" },
      { name: "Sandals & Slides", href: "/collections/women/shoes/sandals" },
    ],
    clothing: [
      { name: "All Clothing", href: "/collections/women/clothing" },
      { name: "Sports Bras", href: "/collections/women/clothing/sports-bras" },
      { name: "Tops & T-Shirts", href: "/collections/women/clothing/tops" },
      { name: "Shorts", href: "/collections/women/clothing/shorts" },
      { name: "Leggings", href: "/collections/women/clothing/leggings" },
      { name: "Hoodies & Sweatshirts", href: "/collections/women/clothing/hoodies" },
      { name: "Jackets", href: "/collections/women/clothing/jackets" },
    ],
    sport: [
      { name: "Running", href: "/collections/women/sport/running" },
      { name: "Training", href: "/collections/women/sport/training" },
      { name: "Yoga", href: "/collections/women/sport/yoga" },
      { name: "Basketball", href: "/collections/women/sport/basketball" },
      { name: "Tennis", href: "/collections/women/sport/tennis" },
      { name: "Golf", href: "/collections/women/sport/golf" },
    ],
  },
  Footwear: {
    featured: [
      { name: "New Releases", href: "/collections/footwear/new" },
      { name: "Bestsellers", href: "/collections/footwear/bestsellers" },
      { name: "Shop All Footwear", href: "/collections/footwear" },
    ],
    men: [
      { name: "Men's Running", href: "/collections/men/shoes/running" },
      { name: "Men's Training", href: "/collections/men/shoes/training" },
      { name: "Men's Basketball", href: "/collections/men/shoes/basketball" },
      { name: "Men's Lifestyle", href: "/collections/men/shoes/lifestyle" },
      { name: "Men's Football", href: "/collections/men/shoes/football" },
    ],
    women: [
      { name: "Women's Running", href: "/collections/women/shoes/running" },
      { name: "Women's Training", href: "/collections/women/shoes/training" },
      { name: "Women's Lifestyle", href: "/collections/women/shoes/lifestyle" },
      { name: "Women's Basketball", href: "/collections/women/shoes/basketball" },
      { name: "Women's Yoga", href: "/collections/women/shoes/yoga" },
    ],
    sport: [
      { name: "Running", href: "/collections/footwear/running" },
      { name: "Training & Gym", href: "/collections/footwear/training" },
      { name: "Basketball", href: "/collections/footwear/basketball" },
      { name: "Football", href: "/collections/footwear/football" },
      { name: "Lifestyle", href: "/collections/footwear/lifestyle" },
    ],
  },
  Accessories: {
    featured: [
      { name: "New Arrivals", href: "/collections/accessories/new" },
      { name: "Bestsellers", href: "/collections/accessories/bestsellers" },
      { name: "Shop All Accessories", href: "/collections/accessories" },
    ],
    bags: [
      { name: "All Bags", href: "/collections/accessories/bags" },
      { name: "Backpacks", href: "/collections/accessories/bags/backpacks" },
      { name: "Duffel Bags", href: "/collections/accessories/bags/duffel" },
      { name: "Gym Bags", href: "/collections/accessories/bags/gym" },
      { name: "Tote Bags", href: "/collections/accessories/bags/tote" },
    ],
    equipment: [
      { name: "All Equipment", href: "/collections/accessories/equipment" },
      { name: "Water Bottles", href: "/collections/accessories/equipment/bottles" },
      { name: "Fitness Trackers", href: "/collections/accessories/equipment/trackers" },
      { name: "Yoga Mats", href: "/collections/accessories/equipment/yoga" },
      { name: "Resistance Bands", href: "/collections/accessories/equipment/bands" },
    ],
    apparel: [
      { name: "Hats & Caps", href: "/collections/accessories/hats" },
      { name: "Socks", href: "/collections/accessories/socks" },
      { name: "Gloves", href: "/collections/accessories/gloves" },
      { name: "Sunglasses", href: "/collections/accessories/sunglasses" },
      { name: "Watches", href: "/collections/accessories/watches" },
    ],
  },
}

// Helper function to get the second column data and title
function getSecondColumnData(activeMenu: string, menuData: any) {
  switch (activeMenu) {
    case "Men":
    case "Women":
      return { data: menuData.shoes, title: "Shoes" };
    case "Footwear":
      return { data: menuData.men, title: "Men's" };
    case "Accessories":
      return { data: menuData.bags, title: "Bags & Backpacks" };
    default:
      return { data: [], title: "" };
  }
}

// Helper function to get the third column data and title
function getThirdColumnData(activeMenu: string, menuData: any) {
  switch (activeMenu) {
    case "Men":
    case "Women":
      return { data: menuData.clothing, title: "Clothing" };
    case "Footwear":
      return { data: menuData.women, title: "Women's" };
    case "Accessories":
      return { data: menuData.equipment, title: "Equipment" };
    default:
      return { data: [], title: "" };
  }
}

// Helper function to get the fourth column data and title
function getFourthColumnData(activeMenu: string, menuData: any) {
  switch (activeMenu) {
    case "Men":
    case "Women":
      return { data: menuData.sport, title: "Shop By Sport" };
    case "Footwear":
      return { data: menuData.sport, title: "By Sport" };
    case "Accessories":
      return { data: menuData.apparel, title: "Apparel & More" };
    default:
      return { data: [], title: "" };
  }
}

export function MegaMenu({ isOpen, activeMenu, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  if (!isOpen || !activeMenu || !(activeMenu in megaMenuData)) {
    return null
  }

  const menuData = megaMenuData[activeMenu as keyof typeof megaMenuData]
  const secondColumn = getSecondColumnData(activeMenu, menuData)
  const thirdColumn = getThirdColumnData(activeMenu, menuData)
  const fourthColumn = getFourthColumnData(activeMenu, menuData)

  return (
    <div
      className="absolute left-0 top-full w-full bg-background border-b shadow-lg z-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Featured Column */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">Featured</h3>
            <ul className="space-y-3">
              {menuData.featured.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                  >
                    {item.name}
                    <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
              {secondColumn.title}
            </h3>
            <ul className="space-y-3">
              {secondColumn.data.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                  >
                    {item.name}
                    <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
              {thirdColumn.title}
            </h3>
            <ul className="space-y-3">
              {thirdColumn.data.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                  >
                    {item.name}
                    <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fourth Column */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wide">
              {fourthColumn.title}
            </h3>
            <ul className="space-y-3">
              {fourthColumn.data.map((item: any) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                  >
                    {item.name}
                    <ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}