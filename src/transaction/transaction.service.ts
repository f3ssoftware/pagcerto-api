import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OrganizationService } from '../organization/organization.service';
import { CostCenterService } from '../cost-center/cost-center.service';
import { Organization } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly costCenterService: CostCenterService,
    private readonly organizationService: OrganizationService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const costCenter = await this.costCenterService.findOne(
      createTransactionDto.costCenterId,
    );
    const organization = await this.organizationService.findOne(
      costCenter.organizationId,
    );

    return this.prisma.transaction.create({
      data: {
        amount: createTransactionDto.amount,
        currency: createTransactionDto.currency,
        description: createTransactionDto.description,
        dueDate: createTransactionDto.dueDate,
        fee:
          Number(createTransactionDto.fee) +
          Number(this.calculateProcessorFee(organization)),
        gross: createTransactionDto.gross,
        net: createTransactionDto.net,
        referenceId: createTransactionDto.referenceId,
        costCenter: {
          connect: {
            id: createTransactionDto.costCenterId,
          },
        },
        invoice: createTransactionDto.invoiceId
          ? {
              connect: {
                id: createTransactionDto.invoiceId,
              },
            }
          : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany();
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }
    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }

    return this.prisma.transaction.update({
      where: { id },
      data: {
        amount: updateTransactionDto.amount,
        currency: updateTransactionDto.currency,
        description: updateTransactionDto.description,
        dueDate: updateTransactionDto.dueDate,
        fee: updateTransactionDto.fee,
        gross: updateTransactionDto.gross,
        net: updateTransactionDto.net,
        referenceId: updateTransactionDto.referenceId,
        costCenter: updateTransactionDto.costCenterId
          ? {
              connect: { id: updateTransactionDto.costCenterId },
            }
          : undefined,
        invoice: updateTransactionDto.invoiceId
          ? {
              connect: { id: updateTransactionDto.invoiceId },
            }
          : undefined,
      },
    });
  }

  async remove(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID "${id}" not found.`);
    }
    return this.prisma.transaction.delete({ where: { id } });
  }

  //TODO: Create a method for associate processor with organization
  private calculateProcessorFee(organization: Organization) {
    console.log(organization);
    return Number(0.045);
  }
}
