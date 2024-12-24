import { Module } from '@nestjs/common';
import { ProcessorService } from './processor.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ProcessorService],
  imports: [PrismaModule],
})
export class ProcessorModule {}
