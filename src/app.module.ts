import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProcessorModule } from './processor/processor.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrganizationModule } from './organization/organization.module';
import { CostCenterModule } from './cost-center/cost-center.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    ProcessorModule,
    PrismaModule,
    ClientModule,
    TransactionModule,
    OrganizationModule,
    CostCenterModule,
    CheckoutModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
