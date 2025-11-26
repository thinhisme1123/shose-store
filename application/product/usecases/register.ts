import { AccountService } from "../service/account.service"

export class RegisterUseCase {
  constructor(private service: AccountService) {}

  async execute(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) {
    return this.service.register(data)
  }
}
