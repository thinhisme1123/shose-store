import { Product } from "../enities/product";

interface FilterOptions {
  isGenderCollection?: boolean;
  collectionSlug?: string;
  category?: { id: string } | null;
  selectedColors: string[];
  selectedSizes: string[];
  priceRange: number[];
  sortBy: string;
}

export const filterProductsUseCase = (
  products: Product[],
  options: FilterOptions
): Product[] => {
  if (!Array.isArray(products)) return [];
  let filtered = [...products];
  const {
    isGenderCollection,
    collectionSlug,
    category,
    selectedColors,
    selectedSizes,
    priceRange,
    sortBy,
  } = options;

  // Filter by gender
  if (isGenderCollection) {
    filtered = filtered.filter(
      (product) =>
        product.gender?.toLowerCase() === collectionSlug?.toLowerCase() ||
        product.gender?.toLowerCase() === "unisex"
    );
  } else if (category) {
    filtered = filtered.filter((product) => product.category === category.id);
  }

  // Filter by colors
  if (selectedColors.length > 0) {
    filtered = filtered.filter((p) =>
      p.colors.some((c) => selectedColors.includes(c))
    );
  }

  // Filter by sizes
  if (selectedSizes.length > 0) {
    filtered = filtered.filter((p) =>
      p.sizes.some((s) => selectedSizes.includes(s))
    );
  }

  // Filter by price range
  filtered = filtered.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sorting
  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => b.id.localeCompare(a.id));
      break;
    default:
      break;
  }

  return filtered;
};
