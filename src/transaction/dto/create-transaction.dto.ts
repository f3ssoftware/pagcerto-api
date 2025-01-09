import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Currency } from '@prisma/client';

enum TransactionTypeEnum {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

enum FeeTypeEnum {
  LATE_PAYMENT = 'late_payment',
  FINE = 'fine',
}

class FeeDto {
  @ApiProperty({ enum: FeeTypeEnum, description: 'Type of the fee' })
  @IsEnum(FeeTypeEnum)
  fee_type: FeeTypeEnum;

  @ApiProperty({ enum: Currency, description: 'Currency of the fee' })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({ type: Number, minimum: 1, description: 'Value of the fee' })
  @IsNumber()
  @Min(1)
  value: number;

  @ApiProperty({ type: String, description: 'Description of the fee' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateTransactionDto {
  @ApiProperty({
    type: Number,
    minimum: 0.01,
    description: 'Transaction value',
  })
  @IsNumber()
  @Min(0.01)
  value: number;

  @ApiProperty({
    enum: TransactionTypeEnum,
    description: 'Type of the transaction',
  })
  @IsEnum(TransactionTypeEnum)
  transaction_type: TransactionTypeEnum;

  @ApiProperty({ type: Date, description: 'Due date for the transaction' })
  @IsDate()
  @Type(() => Date)
  due_date: Date;

  @ApiPropertyOptional({
    type: Date,
    description: 'Effective payment date (optional)',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  effective_payment_date?: Date;

  @ApiProperty({
    type: [FeeDto],
    description: 'List of fees associated with the transaction',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeeDto)
  fee: FeeDto[];
}
