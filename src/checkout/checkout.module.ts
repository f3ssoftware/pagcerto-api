import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [PrismaModule],
})
export class CheckoutModule {}
