import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCostCenterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the cost center' })
  name: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'ID of the organization to which the cost center belongs',
  })
  organizationId: string;
}
