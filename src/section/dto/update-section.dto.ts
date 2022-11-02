import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateSectionDto {
  @ApiProperty()
  @IsString()
  description: string;
}
