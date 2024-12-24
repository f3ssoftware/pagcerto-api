import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProcessorModule } from './processor/processor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProcessorModule, PrismaModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
