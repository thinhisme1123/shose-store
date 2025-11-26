import { AccountApi } from "@/infrastructure/product/account-api"

export class AccountService {
  constructor(private api: AccountApi) {}

  async register(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    return this.api.register(data)
  }
}
