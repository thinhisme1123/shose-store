import { AccountApi } from "@/infrastructure/product/account-api";

export class AccountService {
  constructor(private api: AccountApi) {}
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.api.register(data);
  }

  async login(email: string, password: string) {
    return this.api.login(email, password);
  }

  async addToWishlist(productId: string) {
    return this.api.addToWishlist(productId);
  }

  async getWishlist() {
    return this.api.getWishlist();
  }

  async removeWishlist(productId: string) {
    return this.api.removeWishlist(productId);
  }
}
