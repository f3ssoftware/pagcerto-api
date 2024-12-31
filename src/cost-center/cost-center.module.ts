import { Module } from '@nestjs/common';
import { CostCenterService } from './cost-center.service';
import { CostCenterController } from './cost-center.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CostCenterController],
  providers: [CostCenterService],
  imports: [PrismaModule],
})
export class CostCenterModule {}
