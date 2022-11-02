import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreatePollDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isPublic: boolean;
}
