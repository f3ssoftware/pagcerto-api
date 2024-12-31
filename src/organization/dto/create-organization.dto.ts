import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Name of the organization' })
  name: string;
}
