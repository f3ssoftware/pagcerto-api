import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProcessorModule } from './processor/processor.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientModule } from './client/client.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ProcessorModule, PrismaModule, ClientModule, TransactionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
