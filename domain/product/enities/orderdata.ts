export interface OrderData {
  // Contact Information
  email: string;
  phoneNumber: string;
  newsletter: boolean;

  // Shipping Address
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;

  // Billing Address (if different)
  billingFirstName?: string;
  billingLastName?: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;

  // payment method
  paymentMethod: string;
  orderDetails: object;
}