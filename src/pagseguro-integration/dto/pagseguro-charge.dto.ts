import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Card } from './pagseguro-card.dto';
import { Split } from './pagseguro.split.dto';

class Amount {
  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsString()
  currency: string;
}

class PaymentMethod {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  installments: number;

  @ApiProperty()
  @IsNotEmpty()
  capture: boolean;

  @ApiProperty()
  @IsString()
  soft_descriptor: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Card)
  card: Card;
}

export class Charge {
  @ApiProperty()
  @IsString()
  reference_id: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Amount)
  amount: Amount;

  @ApiProperty()
  @ValidateNested()
  @Type(() => PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  notification_urls: string[];

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => Split)
  splits?: Split;
}
