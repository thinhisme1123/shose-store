import { Product } from "../enities/product";
import { User } from "../enities/user";
import { RegisterData } from '@/contexts/auth-context';

export interface AccountRepository {
  register(
    data: RegisterData
  ): Promise<User>;
  login(
    email: string,
    password: string,
  ): Promise<Object>;
  addToWishlist(productId: string): Promise<Object>
  getWishlist(): Promise<Product[]>
  removeWishlist(productId: string): Promise<Object>
}
