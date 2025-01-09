import { PaymentMethod } from '@prisma/client';

export class PayCheckoutDto {
  payment_method: PaymentMethod;
  credit_card?: CreditCardPayment;
}

class CreditCardPayment {
  card_number: string;
  cvv: string;
  holdername: string;
  expiration_month: string;
  expiration_year: string;
}
