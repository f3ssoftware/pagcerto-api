import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Currency } from '@prisma/client';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Description of the transaction' })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount in cents of the transaction into the processor',
  })
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Gross value of the transaction' })
  gross: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Net value of the transaction' })
  net: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Fee applied to the transaction' })
  fee: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Currency of the transaction (e.g., USD, BRL)' })
  currency: Currency;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Reference ID for the transaction',
    required: false,
  })
  referenceId?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'Creation date of the transaction' })
  createdAt: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'Due date of the transaction', required: false })
  dueDate?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Transaction master ID, if applicable',
    required: false,
  })
  transactionMaster?: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Cost center ID associated with the transaction',
  })
  costCenterId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Invoice ID associated with the transaction',
    required: false,
  })
  invoiceId?: string;
}
