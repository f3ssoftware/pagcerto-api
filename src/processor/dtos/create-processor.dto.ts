import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProcessorDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Name of the processor', required: false })
  name?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Indicates if the processor is enabled',
    required: false,
  })
  enabled?: boolean;
}
