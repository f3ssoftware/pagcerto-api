import { Module } from '@nestjs/common';
import { ProcessorService } from './processor.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProcessorController } from './processor.controller';

@Module({
  providers: [ProcessorService],
  imports: [PrismaModule],
  controllers: [ProcessorController],
})
export class ProcessorModule {}
