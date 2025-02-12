import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PagseguroIntegrationService } from '../pagseguro-integration/services/pagseguro-integration.service';
import { PayCheckoutDto } from './dto/pay-checkout.dto';
import { PaymentMethod } from '@prisma/client';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly pagseguroIntegrationService: PagseguroIntegrationService,
  ) {}

  async create(createCheckoutDto: CreateCheckoutDto) {
    const {
      availablePaymentMethods,
      products,
      maxInstallments,
      processorId,
      invoiceId,
    } = createCheckoutDto;

    return this.prisma.checkout.create({
      data: {
        availablePaymentMethods,
        products,
        maxInstallments,
        processor: {
          connect: { id: processorId },
        },
        invoice: invoiceId ? { connect: { id: invoiceId } } : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.checkout.findMany();
  }

  async findOne(id: string) {
    const checkout = await this.prisma.checkout.findUnique({ where: { id } });
    if (!checkout) {
      throw new NotFoundException(`Checkout with ID "${id}" not found.`);
    }
    return checkout;
  }

  async update(id: string, updateCheckoutDto: UpdateCheckoutDto) {
    const {
      availablePaymentMethods,
      products,
      maxInstallments,
      processorId,
      invoiceId,
    } = updateCheckoutDto;

    const checkout = await this.prisma.checkout.findUnique({ where: { id } });
    if (!checkout) {
      throw new NotFoundException(`Checkout with ID "${id}" not found.`);
    }

    return this.prisma.checkout.update({
      where: { id },
      data: {
        availablePaymentMethods,
        products,
        maxInstallments,
        processor: processorId ? { connect: { id: processorId } } : undefined,
        invoice: invoiceId ? { connect: { id: invoiceId } } : undefined,
      },
    });
  }

  async remove(id: string) {
    const checkout = await this.prisma.checkout.findUnique({ where: { id } });
    if (!checkout) {
      throw new NotFoundException(`Checkout with ID "${id}" not found.`);
    }
    return this.prisma.checkout.delete({ where: { id } });
  }

  async pay(id: string, payDto: PayCheckoutDto) {
    switch (payDto.payment_method) {
      case PaymentMethod.CREDIT_CARD:
        {
          return this.pagseguroIntegrationService.createCreditCardOrder({
            reference_id: id,
            shipping: {
              address: {
                city: payDto?.address?.city,
                complement: payDto?.address?.complement,
                country: payDto?.address?.country,
                street: payDto?.address?.address1,
                locality: payDto?.address?.address2,
                number: payDto?.address?.number,
                postal_code: payDto?.address?.zipcode,
                region_code: '',
              },
            },
            customer: {
              name: payDto?.customer?.name,
              email: payDto?.customer?.email,
              phones: payDto?.customer.phones,
              tax_id: payDto?.customer?.document,
            },
            charges: [
              {
                notification_urls: [`${process.env.API_URL}/`],
                reference_id: id,
                amount: {
                  value: payDto?.amount,
                  currency: payDto.currency,
                },
                description: payDto?.description,
                payment_method: {
                  capture: true,
                  card: {
                    exp_month: payDto?.credit_card?.expiration_month,
                    exp_year: payDto?.credit_card?.expiration_year,
                    holder: {
                      name: payDto?.credit_card?.holdername,
                      tax_id: payDto.customer.document,
                    },
                    number: payDto?.credit_card?.card_number,
                    security_code: payDto?.credit_card?.cvv,
                  },
                  soft_descriptor: payDto?.soft_descriptor,
                  installments: payDto?.installments,
                  type: PaymentMethod.CREDIT_CARD,
                },
              },
            ],
            notification_urls: [`${process.env.API_URL}/`],
            items: payDto?.products.map((product) => {
              return {
                ...product,
                unit_amount: product.unit_price,
              };
            }),
          });
        }
        break;
      case PaymentMethod.PIX:
        {
          // return this.pagseguroIntegrationService.createPixOrder({});
        }
        break;
      case PaymentMethod.CRYPTO: {
        return {};
      }
    }
    return this.pagseguroIntegrationService;
  }
}
