import { Currency, PaymentMethod } from '@prisma/client';
import { CountriesEnum } from '../../shared/countries.enum';

export class PayCheckoutDto {
  customer: CustomerDto;
  payment_method: PaymentMethod;
  credit_card?: CreditCardPayment;
  address: BuyerAddress;
  amount: number;
  currency: Currency;
  description: string;
  soft_descriptor: string;
  installments: number;
  products: Product[];
}

class CustomerDto {
  name: string;
  email: string;
  document: string;
  phones: PhoneDto[];
}

class PhoneDto {
  country: string;
  area: string;
  number: string;
}
class CreditCardPayment {
  card_number: string;
  cvv: string;
  holdername: string;
  expiration_month: string;
  expiration_year: string;
}

class BuyerAddress {
  city: string;
  country: CountriesEnum;
  state: string;
  address1: string;
  address2: string;
  zipcode: string;
  complement: string;
  number: string;
}

class Product {
  name: string;
  quantity: number;
  unit_price: number;
}
