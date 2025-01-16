import { PaymentMethod } from '@prisma/client';
import { Countries, CountriesEnum } from '../../shared/countries.enum';

export class PayCheckoutDto {
  payment_method: PaymentMethod;
  credit_card?: CreditCardPayment;
  address: BuyerAddress;
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
