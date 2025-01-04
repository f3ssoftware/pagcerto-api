import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'Available payment methods for the checkout',
    example: ['PIX', 'CREDIT_CARD'],
  })
  availablePaymentMethods: string[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'Products included in the checkout',
    example: [{ id: 'product1', quantity: 2 }],
  })
  products: object[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Maximum number of installments allowed',
    example: 12,
  })
  maxInstallments: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'Processor ID associated with the checkout',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  processorId: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Invoice ID associated with the checkout',
    required: false,
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  invoiceId?: string;
}
