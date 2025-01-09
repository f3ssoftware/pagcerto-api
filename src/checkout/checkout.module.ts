import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PagseguroIntegrationModule } from '../pagseguro-integration/pagseguro-integration.module';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [PrismaModule, PagseguroIntegrationModule],
})
export class CheckoutModule {}
