import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CostCenterModule } from '../cost-center/cost-center.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, CostCenterModule, OrganizationModule],
})
export class TransactionModule {}
