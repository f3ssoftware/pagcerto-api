import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Organization ID the client belongs to' })
  organizationId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Client slug (unique identifier)' })
  slug: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Client secret (password)' })
  secret: string;
}
