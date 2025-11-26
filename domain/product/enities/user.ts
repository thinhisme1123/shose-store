export interface User {
  id: string
  fullName: string
  email: string
  password?: string
  subscribeNewsletter?: boolean
  createdAt?: Date;
  updatedAt?: Date;
}
