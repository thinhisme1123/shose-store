import { ProductRepository } from "@/domain/product/repositories/product-repository";
import { Product } from "@/domain/product/enities/product";

export class ProductApi implements ProductRepository {
  async getProductsByCollection(collection: string): Promise<Product[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-products-by-collection/${collection}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return Array.isArray(data) ? data : data?.products || [];
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    console.log(slug);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/get-products-by-slug/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return null;
    const data = await res.json();

    return data || null;
  }

  async searchProducts(keyword: string): Promise<Product[]> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/search?q=${encodeURIComponent(
        keyword
      )}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to search products");
    const data = await res.json();

    console.log(data);
    
    return data || null;
  }
}
