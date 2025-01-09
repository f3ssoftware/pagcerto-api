import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CheckoutService {
  constructor(private readonly prisma: PrismaService) {}

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

  async pay(id: string, payDto: PayCheckoutDto) {}
}
