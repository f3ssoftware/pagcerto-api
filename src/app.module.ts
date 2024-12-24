import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessorModule } from './processor/processor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProcessorModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
